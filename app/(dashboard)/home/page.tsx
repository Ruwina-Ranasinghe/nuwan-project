'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import { getClasses } from '@/lib/firebase/firestore';
import { Class } from '@/types/class';
import NavBar from '@/components/layout/NavBar';
import ClassCard from '@/components/class/ClassCard';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!user) return;
      
      try {
        setLoadingClasses(true);
        setError(null);
        console.log('Fetching classes...');
        
        const classesData = await getClasses();
        console.log('Classes fetched:', classesData);
        
        setClasses(classesData || []);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Failed to load classes. Please try again.');
        setClasses([]);
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Teacher Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">MJ</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Mr. Johnson</h1>
              <p className="text-xl text-gray-600 mb-4">Mathematics & Physics Expert</p>
              <p className="text-gray-500 max-w-2xl">
                With over 15 years of teaching experience, I specialize in making complex 
                mathematical and physics concepts easy to understand. Join my classes to 
                excel in your academic journey.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Classes Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Available Classes</h2>
            {user?.isAdmin && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/admin')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Admin Panel
              </motion.button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 text-red-700 underline hover:text-red-800"
              >
                Reload Page
              </button>
            </div>
          )}

          {/* Loading State */}
          {loadingClasses ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-64 animate-pulse shadow-lg"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Classes Grid */}
              {classes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((classItem, index) => (
                    <motion.div
                      key={classItem.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ClassCard 
                        classData={classItem}
                        onClick={() => router.push(`/class/${classItem.id}`)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* No Classes Found */
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Classes Available</h3>
                  <p className="text-gray-600 mb-4">There are currently no classes available.</p>
                  {user?.isAdmin && (
                    <button
                      onClick={() => router.push('/admin')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add New Class
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        {/* Promotional Teachers */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Expert Teachers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Sarah Chen', subject: 'Chemistry', color: 'from-green-500 to-teal-600' },
              { name: 'Prof. David Wilson', subject: 'Biology', color: 'from-purple-500 to-pink-600' },
              { name: 'Ms. Emily Rodriguez', subject: 'English Literature', color: 'from-orange-500 to-red-600' }
            ].map((teacher, index) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${teacher.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
                <p className="text-gray-600">{teacher.subject}</p>
                <button className="mt-4 text-blue-600 font-medium hover:text-blue-700">
                  View Classes →
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}