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

  // Teacher data with poster images
  const teachers = [
    {
      id: 1,
      name: "රංග ප්‍රභාත්",
      subject: "Business Studies",
      poster: "/teacher-posters/ranga.jpg",
      // description: "Expert in Financial Accounting & Management"
    },
    {
      id: 2,
      name: "සාලිය බණ්ඩාර",
      subject: "Economics",
      poster: "/teacher-posters/saliya.jpg",
      // description: "Corporate Finance & Economics"
    },
    {
      id: 3,
      name: "සසිඳු බණ්ඩාර",
      subject: "Accountiing",
      poster: "/teacher-posters/sasindu.jpg",
      // description: "Statistics & Business Mathematics"
    }
  ];

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
              <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{
                textShadow: `
                  1px 1px 0px #e5e7eb,
                  2px 2px 0px #d1d5db,
                  3px 3px 0px #9ca3af,
                  4px 4px 8px rgba(0,0,0,0.15)
                `,
                color: '#1f2937',
                letterSpacing: '-0.02em'
              }}>
                ACCOUNTING <br />with{' '}<br />
                <span className="font-sinhala" style={{
                  textShadow: `
                    1px 1px 0px #dbeafe,
                    2px 2px 0px #bfdbfe,
                    3px 3px 0px #93c5fd,
                    4px 4px 8px rgba(59,130,246,0.2)
                  `,
                  color: '#1d4ed8',
                  letterSpacing: '0.01em'
                }}>
                  නුවන් <br />අබේරත්න
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
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white/80"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative z-10 py-8 w-full"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{
                textShadow: `
                  1px 1px 0px #e5e7eb,
                  2px 2px 0px #d1d5db,
                  3px 3px 0px #9ca3af,
                  4px 4px 8px rgba(0,0,0,0.15)
                `,
                color: '#1f2937',
                letterSpacing: '-0.02em'
              }}>
                ACCOUNTING <br />with{' '}<br />
                <span className="font-sinhala" style={{
                  textShadow: `
                    1px 1px 0px #dbeafe,
                    2px 2px 0px #bfdbfe,
                    3px 3px 0px #93c5fd,
                    4px 4px 8px rgba(59,130,246,0.2)
                  `,
                  color: '#1d4ed8',
                  letterSpacing: '0.01em'
                }}>
                  නුවන් <span className="block mt-5">අබේරත්න</span>
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

      {/* Promotional Section with Teacher Posters */}
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
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Teacher Poster Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teacher.poster}
                    alt={`${teacher.name} - ${teacher.subject}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      // e.target.src = '/default-teacher-poster.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Teacher Information */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 font-sinhala">
                    {teacher.name}
                  </h3>
                  <p className="text-blue-600 text-center font-medium mb-2">
                    {teacher.subject}
                  </p>
                  <p className="text-gray-600 text-center text-sm">
                    {teacher.description}
                  </p>

                  {/* View Profile Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                    onClick={() => router.push(`/teacher/${teacher.id}`)}
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}