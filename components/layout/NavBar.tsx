'use client';
import { motion } from 'framer-motion';
import { User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { logOut } from '@/lib/firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NavBarProps {
  showAuth?: boolean;
}

export default function NavBar({ showAuth = false }: NavBarProps) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { label: 'Courses', href: '/courses' },
    { label: 'Teachers', href: '/teachers' },
    { label: 'Contacts', href: '/contacts' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 60 }}
      className="bg-white shadow-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-extrabold text-blue-600 tracking-wide"
            >
              EduClas
            </motion.h1>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section (Auth/User) */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <Image
                    src={user.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span className="text-gray-700 font-semibold">{user.displayName}</span>
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
            ) : (
              showAuth && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </motion.button>
              )
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden px-4 pb-4 space-y-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-gray-700 hover:text-blue-600 text-base transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
