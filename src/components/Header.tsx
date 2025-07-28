import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Github, Linkedin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const contactLinks = [
    {
      icon: <Mail size={20} />,
      href: "mailto:kg070225@gmail.com",
      label: "Email"
    },
    {
      icon: <Phone size={20} />,
      href: "tel:+18044145262",
      label: "Phone"
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/KartikeyaGoel",
      label: "GitHub"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/kartikeya-goel-b78b2b259/",
      label: "LinkedIn"
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700' : 'bg-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {contactLinks.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 p-2 rounded-lg hover:bg-slate-800/50"
                title={contact.label}
              >
                {contact.icon}
              </a>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                {item}
              </button>
            ))}
            <a
              href="/Kartikeya Goel Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-container md:hidden relative p-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 rounded-xl hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/20"
          >
            <div className="relative">
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}></div>
              <div className={`w-6 h-0.5 bg-current my-1 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}></div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                isMenuOpen ? 'bg-yellow-400/20 blur-sm' : 'bg-transparent'
              }`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Navigation with Liquid Glass Effect */}
        {isMenuOpen && (
          <div className="mobile-menu-container md:hidden transition-all duration-500 ease-out relative z-50 opacity-100 translate-y-0 pointer-events-auto">
            <div className="mt-4 relative">
              {/* Liquid Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl"></div>
              
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 animate-pulse"></div>
              
              {/* Floating Particles Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-yellow-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
              
              {/* Content Container */}
              <div className="relative p-6 space-y-4">
                {['Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="menu-item-liquid w-full text-left text-white hover:text-yellow-400 transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm hover:shadow-lg transform hover:scale-105 border border-transparent hover:border-white/20"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInFromTop 0.5s ease-out forwards'
                    }}
                  >
                    <span className="relative z-10">{item}</span>
                  </button>
                ))}
                <a
                  href="/Kartikeya Goel Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item-liquid w-full text-left text-white hover:text-yellow-400 transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm hover:shadow-lg transform hover:scale-105 border border-transparent hover:border-white/20 block"
                  style={{
                    animationDelay: '500ms',
                    animation: 'slideInFromTop 0.5s ease-out forwards'
                  }}
                >
                  <span className="relative z-10">Resume</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;