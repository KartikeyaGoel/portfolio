import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Code, Database, Cloud, Cpu } from 'lucide-react';

const Skills = () => {
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
      bg: "bg-blue-900/30",
      border: "border-blue-700/50",
      icon: "bg-yellow-500",
      text: "text-white",
      skill: "bg-blue-500/20 text-blue-300 border border-blue-500/30"
    },
    green: {
      bg: "bg-green-900/30",
      border: "border-green-700/50",
      icon: "bg-yellow-500",
      text: "text-white",
      skill: "bg-green-500/20 text-green-300 border border-green-500/30"
    },
    purple: {
      bg: "bg-purple-900/30",
      border: "border-purple-700/50",
      icon: "bg-yellow-500",
      text: "text-white",
      skill: "bg-purple-500/20 text-purple-300 border border-purple-500/30"
    },
    orange: {
      bg: "bg-orange-900/30",
      border: "border-orange-700/50",
      icon: "bg-yellow-500",
      text: "text-white",
      skill: "bg-orange-500/20 text-orange-300 border border-orange-500/30"
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <p className="text-xl text-gray-300">Technical expertise and competencies</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            return (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                className={`${colors.bg} ${colors.border} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${colors.icon} text-slate-900 p-3 rounded-lg`}>
                    {category.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text}`}>
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`${colors.skill} px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;