'use client';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon, File } from 'lucide-react';
import { ClassFile } from '@/types/class';

interface DownloadSectionProps {
  files: ClassFile[];
}

export default function DownloadSection({ files }: DownloadSectionProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-600" size={20} />;
      case 'image':
        return <ImageIcon className="text-green-600" size={20} />;
      default:
        return <File className="text-blue-600" size={20} />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-6">
        <Download className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Resources</h2>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-8">
          <File className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">No resources available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file, index) => (
            <motion.a
              key={file.id}
              href={file.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors group"
            >
              {getFileIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <Download className="text-gray-400 group-hover:text-blue-600" size={16} />
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}