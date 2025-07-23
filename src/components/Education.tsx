import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Calendar, MapPin, Award } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
          <p className="text-xl text-gray-300">Academic journey and achievements</p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.3} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-700 hover:shadow-xl hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Stanford University</h3>
                <p className="text-lg text-yellow-400 font-semibold mb-2">B.S. Computer Science (Coterminal)</p>
                <p className="text-lg text-yellow-400 font-semibold mb-2">M.S. Computational Finance (Planned)</p>
                <p className="text-gray-300 font-medium">Concentration: Systems & AI (planned)</p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar size={16} />
                  <span className="font-medium">2025 - 2029</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span>Stanford, CA</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Education;