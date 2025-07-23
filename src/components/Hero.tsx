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
            Kartikeya Goel
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
            Computer Science Student at Stanford University specializing in Systems & AI. 
            Building intelligent solutions through agentic workflows and machine learning.
        </motion.p>
          
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 mb-12 text-gray-400"
        >
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Richmond Metropolitan Area</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <a href="mailto:kg070225@gmail.com" className="hover:text-yellow-400 transition-colors duration-300">
                kg070225@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>(804) 414-5262</span>
            </div>
        </motion.div>

        <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
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