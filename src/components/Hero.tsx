import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">


      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* 3D Text Effect */}
          <div className="relative">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight relative"
              whileHover={{ 
                scale: 1.02,
                textShadow: "0 0 20px rgba(234, 179, 8, 0.5)"
              }}
              transition={{ duration: 0.3 }}
            >
              Hey, I'm Kartikeya
            </motion.h1>
            
            {/* 3D Shadow Effect */}
            <motion.h1 
              className="absolute inset-0 text-5xl md:text-7xl font-bold text-yellow-400/20 mb-6 leading-tight blur-sm"
              animate={{
                x: [0, 2, 0],
                y: [0, 2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Hey, I'm Kartikeya
            </motion.h1>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          <motion.span 
            onClick={() => scrollToSection('education')}
            className="cursor-pointer hover:text-yellow-400 transition-colors duration-300 hover:scale-105 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CS Student
          </motion.span>
          <span className="mx-2">|</span>
          <motion.span 
            onClick={() => scrollToSection('skills')}
            className="cursor-pointer hover:text-yellow-400 transition-colors duration-300 hover:scale-105 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Software Developer
          </motion.span>
          <span className="mx-2">|</span>
          <motion.span 
            onClick={() => scrollToSection('projects')}
            className="cursor-pointer hover:text-yellow-400 transition-colors duration-300 hover:scale-105 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tech Enthusiast
          </motion.span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={() => scrollToSection('education')}
          className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 px-8 py-4 rounded-full hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold overflow-hidden"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(234, 179, 8, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          
          <span className="relative z-10">Learn More About Me</span>
          <motion.div
            className="relative z-10"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;