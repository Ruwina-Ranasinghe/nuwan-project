'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import { getClass, getClassFiles } from '@/lib/firebase/firestore';
import { Class, ClassFile } from '@/types/class';
import NavBar from '@/components/layout/NavBar';
import VideoPlayer from '@/components/class/VideoPlayer';
import CommentSection from '@/components/class/CommentSection';
import DownloadSection from '@/components/class/DownloadSection';

export default function ClassPage() {
  const { classId } = useParams();
  const { user, loading } = useAuth();
  const [classData, setClassData] = useState<Class | null>(null);
  const [classFiles, setClassFiles] = useState<ClassFile[]>([]);
  const [loadingClass, setLoadingClass] = useState(true);

  useEffect(() => {
    const fetchClassData = async () => {
      if (!classId || typeof classId !== 'string') return;
      
      try {
        const [classInfo, files] = await Promise.all([
          getClass(classId),
          getClassFiles(classId)
        ]);
        
        setClassData(classInfo);
        setClassFiles(files);
      } catch (error) {
        console.error('Error fetching class data:', error);
      } finally {
        setLoadingClass(false);
      }
    };

    if (user) {
      fetchClassData();
    }
  }, [classId, user]);

  if (loading || loadingClass) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Class Not Found</h1>
            <p className="text-gray-600">The requested class could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <VideoPlayer videoUrl={classData.videoUrl} />
              
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {classData.title}
                </h1>
                <p className="text-gray-600 mb-4">
                  {classData.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {classData.teacherName}</span>
                  <span>•</span>
                  <span>{new Date(classData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CommentSection classId={classId as string} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <DownloadSection files={classFiles} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}