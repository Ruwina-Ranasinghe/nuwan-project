'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, AlertCircle, CheckCircle } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/config';
import { addClassFile } from '@/lib/firebase/firestore';
import { Class } from '@/types/class';

interface UploadFilesProps {
  classes: Class[];
}

export default function UploadFiles({ classes }: UploadFilesProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setMessage({ type: '', content: '' });
  };

  const getFileType = (filename: string): 'pdf' | 'image' | 'document' => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return 'image';
    return 'document';
  };

  const handleUpload = async () => {
    if (!files || !selectedClass) {
      setMessage({ type: 'error', content: 'Please select a class and files to upload' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', content: '' });

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileName = `class-files/${selectedClass}/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, fileName);
        
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await addClassFile({
          classId: selectedClass,
          name: file.name,
          url: downloadURL,
          type: getFileType(file.name),
          uploadedAt: new Date(),
        });

        return { name: file.name, url: downloadURL };
      });

      await Promise.all(uploadPromises);
      
      setMessage({ 
        type: 'success', 
        content: `Successfully uploaded ${files.length} file(s)` 
      });
      setFiles(null);
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage({ type: 'error', content: 'Failed to upload files. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <File className="text-green-600" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upload Class Files</h2>
          <p className="text-gray-600">Add resources, notes, and materials for your classes</p>
        </div>
      </div>

      {message.content && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-lg p-4 mb-6 flex items-center space-x-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="text-green-600" size={20} />
          ) : (
            <AlertCircle className="text-red-600" size={20} />
          )}
          <span className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
            {message.content}
          </span>
        </motion.div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Class *
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Choose a class...</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Files *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Click to upload files
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC, PPT, Images (Max 10MB each)
              </p>
            </label>
          </div>
          
          {files && files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected Files ({files.length}):
              </p>
              <div className="space-y-2">
                {Array.from(files).map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <File size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          disabled={!selectedClass || !files || uploading}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={20} />
              <span>Upload Files</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}