import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Calendar, ExternalLink, Github, Award } from 'lucide-react';

const Projects = () => {
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
      award: "National TSA Conference Participant"
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
      ]
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
          <p className="text-xl text-gray-300">Selected work and technical achievements</p>
        </AnimatedSection>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.3} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 hover:shadow-lg hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    {project.award && (
                      <Award size={20} className="text-yellow-400" />
                    )}
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
                    <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 border border-yellow-500/30">
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
                      className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <ul className="space-y-3">
                  {project.description.map((desc, descIndex) => (
                    <li key={descIndex} className="flex items-start gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;