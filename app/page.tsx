'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useEffect } from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavBar showAuth={true} />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Desktop Layout - Grid with content left, image right */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-12 md:items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
  ACCOUNTING <br />with{' '}<br />
  <span className="font-sinhala text-blue-600">
    නුවන් අබේරත්න
  </span>
</h1>


             <p className="text-sm md:text-base text-gray-600 mb-8">
  "ගිණුම්කරණයේ ගැඹුරු හැඟීම් තාක්ෂණයෙන් සරල කරමින්, සිසුන්ට නව දැනුමක් ගෙනෙන නව යුගයේ වෙබ් යෙදුමක්!"
</p>


              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Start Learning Today
              </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="/nuwan2.png" 
                alt="Accounting Illustration" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Mobile Layout - Centered with background image */}
          <div className="md:hidden relative min-h-[600px] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img 
                src="/nuwan2.png" 
                alt="Background" 
                className="w-full h-full object-cover opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white/80"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative z-10 py-8 w-full"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                ACCOUNTING <br />with{' '}<br />
                <span className="font-sinhala text-blue-600">
                  නුවන් <br />අබේරත්න
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                "ගිණුම්කරණයේ ගැඹුරු හැඟීම් තාක්ෂණයෙන් සරල කරමින්, සිසුන්ට නව දැනුමක් ගෙනෙන නව යුගයේ වෙබ් යෙදුමක්!"
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Start Learning Today
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-12 text-gray-900"
          >
            Featured Teachers
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-center mb-2">Teacher {i}</h3>
                <p className="text-gray-600 text-center">Subject Specialist</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
