'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, AlertCircle } from 'lucide-react';
import { createClass } from '@/lib/firebase/firestore';
import { useAuth } from '@/lib/hooks/useAuth';

interface UploadVideoProps {
  onSuccess: () => void;
}

export default function UploadVideo({ onSuccess }: UploadVideoProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateYouTubeUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    if (!validateYouTubeUrl(formData.videoUrl)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    try {
      await createClass({
        title: formData.title,
        description: formData.description,
        videoUrl: formData.videoUrl,
        thumbnail: formData.thumbnail,
        teacherName: user.displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setFormData({
        title: '',
        description: '',
        videoUrl: '',
        thumbnail: '',
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating class:', error);
      setError('Failed to create class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Video className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upload New Class</h2>
          <p className="text-gray-600">Add a new video class for your students</p>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3"
        >
          <AlertCircle className="text-red-600" size={20} />
          <span className="text-red-700">{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter class title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Describe your class content"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL *
          </label>
          <input
            type="url"
            required
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter a valid YouTube video URL
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail URL (optional)
          </label>
          <input
            type="url"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/thumbnail.jpg"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to use YouTube thumbnail
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Class...</span>
            </>
          ) : (
            <>
              <Upload size={20} />
              <span>Create Class</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}