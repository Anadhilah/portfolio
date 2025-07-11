import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ProjectFilter from './components/ProjectFilter';
import InteractiveSkills from './components/InteractiveSkills';
import JourneyTimeline from './components/JourneyTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <Hero />
        <About />
        <JourneyTimeline />
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                My Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Explore my work through interactive filtering and detailed project previews
              </p>
            </div>
            <ProjectFilter />
          </div>
        </section>
        <section id="skills" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                Skills & Expertise
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Interactive exploration of my technical skills and experience levels
              </p>
            </div>
            <InteractiveSkills />
          </div>
        </section>
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;