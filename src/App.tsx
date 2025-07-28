import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50"
      >
        <div className="text-center">
          {/* Custom Preloader */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto relative">
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 border-4 border-yellow-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border-4 border-yellow-400/60 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 border-4 border-yellow-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center dot */}
              <motion.div
                className="absolute inset-8 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
          
          {/* Loading text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-white mb-4"
          >
            Loading Portfolio
          </motion.h2>
          
          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden mx-auto"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center gap-2 mt-6"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen relative"
      >
        {/* Unified Gradient Background */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-yellow-900/20"
          style={{
            zIndex: -1
          }}
          animate={{
            background: [
              "linear-gradient(to bottom right, #0f172a, rgba(59, 130, 246, 0.3), rgba(234, 179, 8, 0.2))",
              "linear-gradient(to bottom right, #0f172a, rgba(30, 64, 175, 0.3), rgba(245, 158, 11, 0.2))",
              "linear-gradient(to bottom right, #0f172a, rgba(59, 130, 246, 0.2), rgba(234, 179, 8, 0.3))",
              "linear-gradient(to bottom right, #0f172a, rgba(30, 64, 175, 0.2), rgba(245, 158, 11, 0.3))",
              "linear-gradient(to bottom right, #0f172a, rgba(59, 130, 246, 0.3), rgba(234, 179, 8, 0.2))",
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        

        
        <Header />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Hero />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Education />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Skills />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Experience />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Projects />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Contact />
        </motion.div>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;