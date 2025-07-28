import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Code, Database, Cloud, Cpu } from 'lucide-react';
import { useState } from 'react';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code size={24} />,
      color: "blue",
      skills: ["Python", "Java", "JavaScript", "C++", "Google Apps Script", "reST", "React", "HTML"]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Database size={24} />,
      color: "green",
      skills: ["Google ADK", "Google AgentEngine", "Google AgentSpace", "Google Colab", "UiPath", "numpy", "pandas", "scikit-learn", "OpenCV", "WPILib"]
    },
    {
      title: "Tools & Platforms",
      icon: <Cloud size={24} />,
      color: "purple",
      skills: ["GitHub", "VS Code", "PostgreSQL", "LabVIEW", "Vertex AI", "Google Conversational Agents", "Google Cloud Console"]
    },
    {
      title: "Specialized Technologies",
      icon: <Cpu size={24} />,
      color: "orange",
      skills: ["Controller Area Network Protocol (CAN)", "Robotics Process Automation", "AI Image Generation", "SEO Optimization", "YOLO Models", "Kalman Filters"]
    }
  ];

  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-900/30 to-blue-800/20",
      border: "border-blue-700/50",
      icon: "bg-gradient-to-r from-blue-500 to-blue-600",
      text: "text-white",
      skill: "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-500/30",
      glow: "shadow-blue-500/50"
    },
    green: {
      bg: "bg-gradient-to-br from-green-900/30 to-green-800/20",
      border: "border-green-700/50",
      icon: "bg-gradient-to-r from-green-500 to-green-600",
      text: "text-white",
      skill: "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border border-green-500/30",
      glow: "shadow-green-500/50"
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-900/30 to-purple-800/20",
      border: "border-purple-700/50",
      icon: "bg-gradient-to-r from-purple-500 to-purple-600",
      text: "text-white",
      skill: "bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border border-purple-500/30",
      glow: "shadow-purple-500/50"
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-900/30 to-orange-800/20",
      border: "border-orange-700/50",
      icon: "bg-gradient-to-r from-orange-500 to-orange-600",
      text: "text-white",
      skill: "bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300 border border-orange-500/30",
      glow: "shadow-orange-500/50"
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <h2 className="text-4xl font-bold text-white">Skills & Technologies</h2>
          </motion.div>
          <p className="text-xl text-gray-300">Technical expertise and competencies</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 20px 40px ${colors.glow}`,
                }}
                onHoverStart={() => setHoveredCategory(index)}
                onHoverEnd={() => setHoveredCategory(null)}
                className={`${colors.bg} ${colors.border} border rounded-2xl p-6 transition-all duration-500 backdrop-blur-sm relative overflow-hidden group`}
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center gap-4 mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className={`${colors.icon} text-white p-3 rounded-lg shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className={`text-xl font-bold ${colors.text}`}>
                      {category.title}
                    </h3>
                  </motion.div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: `0 10px 20px ${colors.glow}`,
                        }}
                        onHoverStart={() => setHoveredSkill(skill)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        className={`${colors.skill} px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer relative overflow-hidden group/skill`}
                      >
                        {/* Skill hover effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300`}></div>
                        
                        <span className="relative z-10">{skill}</span>
                        
                        {/* Floating particles on hover */}
                        {hoveredSkill === skill && (
                          <>
                            <motion.div
                              className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.div
                              className="absolute -bottom-1 -right-1 w-1 h-1 bg-white rounded-full"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            />
                          </>
                        )}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;