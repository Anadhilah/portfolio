import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import profileImage  from '../Images/me.jpg';

const Hero = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          <source src="https://player.vimeo.com/external/434045526.hd.mp4?s=7f5a3c0b0e563e8b5c0e4f5a5c5e5c5e5c5e5c5e&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-teal-900/70 dark:from-blue-900/80 dark:via-purple-900/70 dark:to-teal-900/80"></div>
        
        {/* Animated Particles Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-1/3 right-2/3 w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative z-10 text-center">
          {/* Profile Image Placeholder */}
          <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <img
              src={profileImage}
              alt="Anastasia Andoh"
              className="w-full h-full object-cover"
            />
          </div>


          {/* Hero Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300 animate-pulse">Anastasia</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
              Aspiring Frontend Developer & Tech Enthusiast
            </p>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              Passionate about creating beautiful, functional web experiences with modern technologies. 
              Currently exploring the exciting worlds of  AI while building my frontend development skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={scrollToAbout}
                className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 border border-white/20"
              >
                Learn More About Me
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white/40 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-md"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-12">
              <a
                href="https://github.com/Anadhilah"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 border border-white/20 hover:bg-white/30"
              >
                <Github className="h-6 w-6 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/anastasia-andoh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 border border-white/20 hover:bg-white/30"
              >
                <Linkedin className="h-6 w-6 text-white" />
              </a>
              <a
                href="mailto:andohanastasia3@gmail.com"
                className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 border border-white/20 hover:bg-white/30"
              >
                <Mail className="h-6 w-6 text-white" />
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce opacity-80">
              <button
                onClick={scrollToAbout}
                className="p-2 text-white/70 hover:text-white transition-colors duration-300"
              >
                <ArrowDown className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;