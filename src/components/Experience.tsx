import { motion } from 'framer-motion';
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
      current: true,
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30"
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
      current: false,
      color: "from-green-500/20 to-blue-500/20",
      borderColor: "border-green-500/30"
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
      current: false,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
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
            <h2 className="text-4xl font-bold text-white">Experience</h2>
          </motion.div>
          <p className="text-xl text-gray-300">Professional journey and internships</p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto relative">
          {/* Interactive Timeline line */}
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />
          
          <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative flex items-start group"
            >
              {/* Animated Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-yellow-400 rounded-full border-4 border-slate-900 z-10" />
              
              {/* Timeline icon with rotation */}
              <motion.div 
                className="absolute left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center z-20"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Briefcase size={16} className="text-slate-900" />
              </motion.div>
              
              {/* Content with 3D effects */}
              <div className={`ml-20 bg-gradient-to-br ${exp.color} backdrop-blur-sm rounded-2xl border ${exp.borderColor} p-8 transition-all duration-500 w-full relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-yellow-500/20`}>
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {exp.company}
                        </h3>
                        {exp.current && (
                          <motion.span 
                            className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            Current
                          </motion.span>
                        )}
                      </div>
                      
                      <p className="text-lg text-yellow-400 font-semibold mb-3">
                        {exp.role}
                      </p>
                      
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
                        <li 
                          key={descIndex} 
                          className="flex items-start gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                        >
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;