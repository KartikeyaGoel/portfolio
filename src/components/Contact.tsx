import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Mail, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "kg070225@gmail.com",
      href: "mailto:kg070225@gmail.com",
      color: "text-yellow-400"
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: "(804) 414-5262",
      href: "tel:+18044145262",
      color: "text-yellow-400"
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: "KartikeyaGoel",
      href: "https://github.com/KartikeyaGoel",
      color: "text-yellow-400"
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: "kartikeyagoel",
      href: "https://www.linkedin.com/in/kartikeya-goel-b78b2b259/",
      color: "text-yellow-400"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm always interested in discussing new opportunities, collaborations, or just having a chat about technology and innovation
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contactInfo.map((contact, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:shadow-lg hover:border-yellow-500/30 transition-all duration-300">
                {contact.href ? (
                  <a 
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`${contact.color} p-3 rounded-lg bg-yellow-500/10`}>
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-400 mb-1">{contact.label}</p>
                      <p className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                        {contact.value}
                      </p>
                    </div>
                    {contact.href.startsWith('http') && (
                      <ExternalLink size={18} className="text-gray-400 group-hover:text-yellow-400 transition-colors" />
                    )}
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className={`${contact.color} p-3 rounded-lg bg-yellow-500/10`}>
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-400 mb-1">{contact.label}</p>
                      <p className="text-lg font-semibold text-white">{contact.value}</p>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.6} className="text-center mt-12">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Let's Connect!</h3>
              <p className="text-slate-800 mb-6 leading-relaxed">
                Whether you're interested in discussing AI research, software development opportunities, 
                or potential collaborations, I'd love to hear from you.
              </p>
              <a
                href="mailto:kg070225@gmail.com"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
              >
                <Mail size={20} />
                Send Message
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;