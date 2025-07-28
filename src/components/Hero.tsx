import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Mail, Phone } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hey, I'm Kartikeya
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          <span 
            onClick={() => scrollToSection('education')}
            className="cursor-pointer hover:text-yellow-400 transition-colors duration-300 hover:scale-105 inline-block"
          >
            CS Student
          </span>
          <span className="mx-2">|</span>
          <span 
            onClick={() => scrollToSection('skills')}
            className="cursor-pointer hover:text-yellow-400 transition-colors duration-300 hover:scale-105 inline-block"
          >
            Software Developer
          </span>
          <span className="mx-2">|</span>
          <span 
            onClick={() => scrollToSection('projects')}
            className="cursor-pointer hover:text-yellow-400 transition-colors duration-300 hover:scale-105 inline-block"
          >
            Tech Enthusiast
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={() => scrollToSection('education')}
          className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
        >
          Learn More About Me
          <ChevronDown size={20} />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;