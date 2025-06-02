'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-bold mb-4"
            >
              EduClass
            </motion.h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering students with quality education through innovative online learning 
              experiences. Join thousands of students who have transformed their academic journey.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {['About Us', 'Courses', 'Teachers', 'Contact', 'Privacy Policy'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} />
                <span>info@educlass.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} />
                <span>123 Education St, Learning City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} EduClass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}