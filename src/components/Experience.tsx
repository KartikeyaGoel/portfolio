import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: "MARi",
      role: "Agentic Workflow Engineering Intern",
      period: "Jun 2025 - Present",
      location: "Remote",
      description: [
        "Designed and deployed a multistage agentic system to automate blog post generation using Google ADK and Vertex AI",
        "Developed conditional looping subagent hierarchies to provide targeted feedback throughout the content pipeline (outline, draft, refine, publish)",
        "Integrated tools such as AI Image Generation, SEO optimization, and Current Events searching to enhance blog posts"
      ],
      current: true
    },
    {
      company: "IQ Spectra Inc.",
      role: "Software Engineering Intern",
      period: "Mar 2023 - Apr 2025",
      location: "Remote",
      description: [
        "Delivered weekly software updates including Google Apps Scripts, spec docs, and automation scripts",
        "Designed unit tests and macros to support business process automation; trained in UiPath platform",
        "Studying and shadowing the RPA (Robotics Process Automation) release process using GitHub and UiPath Orchestrator"
      ],
      current: false
    },
    {
      company: "Jefferson Lab",
      role: "Research Intern",
      period: "Jun 2023 - Jul 2023",
      location: "Newport News, VA",
      description: [
        "Reverse-engineered backend logic of a Python-based AI framework for scientific imaging",
        "Authored 30+ technical documents and 5 tutorials for internal and public use",
        "Collaborated with senior researchers to optimize model training and data pipelines"
      ],
      current: false
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-xl text-gray-300">Professional journey and internships</p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"></div>
          
          <div className="space-y-12">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 0.2} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-yellow-400 rounded-full border-4 border-slate-900 z-10"></div>
              
              {/* Timeline icon */}
              <div className="absolute left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center z-20">
                <Briefcase size={16} className="text-slate-900" />
              </div>
              
              {/* Content */}
              <div className="ml-20 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 hover:shadow-lg hover:border-yellow-500/30 transition-all duration-300 w-full">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                      {exp.current && (
                        <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-yellow-400 font-semibold mb-3">{exp.role}</p>
                    <div className="flex flex-col sm:flex-row gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-6">
                  <ul className="space-y-3">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;