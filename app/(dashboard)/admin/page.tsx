// 'use client';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/lib/hooks/useAuth';
// import { useRouter } from 'next/navigation';
// import { getClasses } from '@/lib/firebase/firestore';
// import { Class } from '@/types/class';
// import NavBar from '@/components/layout/NavBar';
// import UploadVideo from '@/components/admin/UploadVideo';
// import UploadFiles from '@/components/admin/UploadFiles';
// import AdminClassCard from '@/components/admin/AdminClassCard';
// import { Plus, Video, Upload } from 'lucide-react';

// export default function AdminPage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [activeTab, setActiveTab] = useState<'classes' | 'upload-video' | 'upload-files'>('classes');
//   const [loadingClasses, setLoadingClasses] = useState(true);

//   useEffect(() => {
//     if (!loading && (!user || !user.isAdmin)) {
//       router.push('/home');
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const classesData = await getClasses();
//         setClasses(classesData);
//       } catch (error) {
//         console.error('Error fetching classes:', error);
//       } finally {
//         setLoadingClasses(false);
//       }
//     };

//     if (user?.isAdmin) {
//       fetchClasses();
//     }
//   }, [user]);

//   if (loading || !user?.isAdmin) {
//     return <div className="flex items-center justify-center min-h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//     </div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <NavBar />
      
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
//           <p className="text-gray-600">Manage your classes, videos, and resources</p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-xl shadow-lg mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               {[
//                 { id: 'classes', label: 'Classes', icon: Video },
//                 { id: 'upload-video', label: 'Upload Video', icon: Plus },
//                 { id: 'upload-files', label: 'Upload Files', icon: Upload },
//               ].map((tab) => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id as any)}
//                     className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
//                       activeTab === tab.id
//                         ? 'border-blue-500 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Icon size={18} />
//                     <span>{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === 'classes' && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="space-y-6"
//               >
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold">Manage Classes</h2>
//                   <span className="text-sm text-gray-500">
//                     {classes.length} total classes
//                   </span>
//                 </div>

//                 {loadingClasses ? (
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[1, 2, 3].map((i) => (
//                       <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
//                     ))}
//                   </div>
//                 ) : classes.length === 0 ? (
//                   <div className="text-center py-12">
//                     <Video className="mx-auto text-gray-400 mb-4" size={48} />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h3>
//                     <p className="text-gray-500">Upload your first video to get started</p>
//                   </div>
//                 ) : (
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {classes.map((classItem, index) => (
//                       <motion.div
//                         key={classItem.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                       >
//                         <AdminClassCard 
//                           classData={classItem}
//                           onUpdate={() => {
//                             // Refresh classes
//                             setLoadingClasses(true);
//                             getClasses().then(setClasses).finally(() => setLoadingClasses(false));
//                           }}
//                         />
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             )}

//             {activeTab === 'upload-video' && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <UploadVideo 
//                   onSuccess={() => {
//                     setActiveTab('classes');
//                     // Refresh classes
//                     setLoadingClasses(true);
//                     getClasses().then(setClasses).finally(() => setLoadingClasses(false));
//                   }}
//                 />
//               </motion.div>
//             )}

//             {activeTab === 'upload-files' && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <UploadFiles classes={classes} />
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }