import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 border-t border-gray-700 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Anastasia Andoh</h3>
            <p className="text-gray-400 dark:text-gray-500">Frontend Developer & Tech Enthusiast</p>
          </div>
          
          <div className="flex justify-center items-center space-x-2 mb-6">
            <span className="text-gray-400 dark:text-gray-500">Made with</span>
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-gray-400 dark:text-gray-500">and</span>
            <Code className="h-5 w-5 text-blue-500" />
            <span className="text-gray-400 dark:text-gray-500">using React & Tailwind CSS</span>
          </div>
          
          <div className="border-t border-gray-700 dark:border-gray-800 pt-6">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © {new Date().getFullYear()} Anastasia Andoh. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;