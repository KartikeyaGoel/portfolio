import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Calendar, ExternalLink, Github, Award, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const projects = [
    {
      title: "Test Score Predictor",
      period: "Jan 2024 - May 2024",
      tools: ["Python", "scikit-learn", "pandas", "numpy"],
      githubRepo: "https://github.com/KartikeyaGoel/SOL_Score_Predictor",
      description: [
        "Co-developed a predictive AI model using scikit-learn to forecast standardized test scores for public schools in Virginia",
        "Utilized a comprehensive database containing school demographic data, teacher information, graduation rates, absenteeism, and other student statistics",
        "The model helped schools identify factors influencing test scores, enabling schools to make targeted improvements",
        "Competed at National TSA Conference in the Software Development Challenge"
      ],
      award: "National TSA Conference Participant",
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "First Robotics Competition Code Base",
      period: "Jan 2024 - Dec 2024",
      tools: ["Java", "OpenCV", "WPILib", "CAN"],
      githubRepo: "https://github.com/Robohawks-346-Programming/Team346_2024_Offseason",
      description: [
        "Created Kalman filters and sensor fusion algorithms for accurate robot pose estimation",
        "Integrated YOLO models to identify and autonomously retrieve game pieces",
        "Designed autonomous trajectory generation with Bézier curves and dynamic splines",
        "Built simulation tools with GitHub workflows for faster development and testing"
      ],
      color: "from-green-500/20 to-blue-500/20",
      borderColor: "border-green-500/30"
    }
  ];

  const { getAnimationClasses } = useScrollAnimation(0.1, 'slideUp');

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
          <p className="text-xl text-gray-300">Selected work and technical achievements</p>
        </AnimatedSection>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`group relative bg-gradient-to-br ${project.color} backdrop-blur-xl rounded-2xl border ${project.borderColor} p-8 transition-all duration-500 ease-out cursor-pointer`}
            >
              {/* 3D Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.award && (
                        <Award size={20} className="text-yellow-400 animate-pulse" />
                      )}
                      <ArrowUpRight 
                        size={20} 
                        className="text-gray-400 group-hover:text-yellow-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={16} />
                        <span className="font-medium">{project.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 cursor-pointer transition-colors duration-300">
                        <Github size={16} />
                        <a 
                          href={project.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                        >
                          GitHub Repo
                        </a>
                      </div>
                    </div>
                    {project.award && (
                      <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 border border-yellow-500/30 animate-pulse">
                        {project.award}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30 hover:scale-105 hover:bg-blue-500/30 transition-all duration-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <ul className="space-y-3">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;