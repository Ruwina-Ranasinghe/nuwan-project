'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Class } from '@/types/class';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface AdminClassCardProps {
  classData: Class;
  onUpdate: () => void;
}

export default function AdminClassCard({ classData, onUpdate }: AdminClassCardProps) {
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'classes', classData.id));
      onUpdate();
    } catch (error) {
      console.error('Error deleting class:', error);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        {classData.thumbnail ? (
          <img
            src={classData.thumbnail}
            alt={classData.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Eye className="text-white" size={48} />
          </div>
        )}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"
          >
            <Edit size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowDeleteConfirm(true)}
            className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
          >
            <Trash2 size={14} />
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {classData.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {classData.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User size={16} />
            <span>{classData.teacherName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>{formatDate(classData.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md mx-4"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Class</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{classData.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}