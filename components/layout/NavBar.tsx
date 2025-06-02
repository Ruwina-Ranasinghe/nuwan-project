'use client';
import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { logOut } from '@/lib/firebase/auth';
import Image from 'next/image';

interface NavBarProps {
  showAuth?: boolean;
}

export default function NavBar({ showAuth = false }: NavBarProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <h1 className="text-2xl font-bold text-blue-600">EduClass</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-3">
                  <Image
                    src={user.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-gray-700 font-medium">
                    {user.displayName}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </motion.button>
              </>
            )}
            
            {showAuth && !user && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}