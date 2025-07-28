import { motion } from 'framer-motion';
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
  return (
    <div className="min-h-screen relative">
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
    </div>
  );
}

export default App;