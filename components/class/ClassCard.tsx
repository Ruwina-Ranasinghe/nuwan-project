'use client';
import { motion } from 'framer-motion';
import { Play, Calendar, User } from 'lucide-react';
import { Class } from '@/types/class';

interface ClassCardProps {
  classData: Class;
  onClick: () => void;
}

export default function ClassCard({ classData, onClick }: ClassCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
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
            <Play className="text-white" size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="text-white" size={32} />
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
    </motion.div>
  );
}