// import React from 'react';
import { BookOpen, Brain, Code, Heart, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know more about my journey, education, and what drives my passion for technology
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Journey</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                I'm a passionate junior web developer with a good foundation in IT and an insatiable 
                curiosity for technology. Currently pursuing my BSc in Information Technology at the 
                University of Ghana, I'm dedicated to mastering frontend development while exploring 
                the fascinating realms of cybersecurity and artificial intelligence.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                What sets me apart is my genuine love for learning new skills and my ability to quickly adapt to 
                new technologies. I believe in work done and creating user 
                experiences that not only look great but also solve real problems.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring the latest tech trends, thinking of innovative projects, beading
                 or doing research. I'm always eager to 
                take on new challenges and collaborate with like-minded developers.
              </p>
            </div>

            {/* Right Column - Cards */}
            <div className="space-y-6">
              {/* Education Card */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Education</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>BSc in Information Technology</strong><br />
                  University of Ghana<br />
                  <span className="text-gray-600 dark:text-gray-400">Current Student</span>
                </p>
              </div>

              {/* Interests Card */}
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100 dark:border-teal-800">
                <div className="flex items-center mb-4">
                  <Brain className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-3" />
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Interests</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm">Cybersecurity</span>
                  <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm">AI </span>
                  <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm">Frontend Dev</span>
                  <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm">Beading</span>
                </div>
              </div>

              {/* Personality Card */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100 dark:border-purple-800">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">What Drives Me</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Curious & Fast Learner</span>
                  </div>
                  <div className="flex items-center">
                    <Code className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Problem Solver</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Team Player</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;