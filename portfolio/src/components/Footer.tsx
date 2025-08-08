// import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-10 border-t border-gray-700 dark:border-gray-800">
      <div className="container mx-auto px-4 text-center">
        {/* Name and Role */}
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">Anastasia Andoh</h3>
          <p className="text-gray-400 dark:text-gray-500">
            Frontend Developer & Tech Enthusiast
          </p>
        </div>

        {/* Made with Love & Code */}
        <div className="flex justify-center items-center space-x-2 text-gray-400 dark:text-gray-500 mb-4">
          <span>Made with</span>
          <Heart className="h-5 w-5 text-red-500" />
          <span>and</span>
          <Code className="h-5 w-5 text-blue-500" />
          <span>using React & Tailwind CSS</span>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 border-t border-gray-700 dark:border-gray-800">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © 2025 Anastasia Andoh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
