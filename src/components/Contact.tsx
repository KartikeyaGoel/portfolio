import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Mail, Phone, Github, Linkedin, ExternalLink, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (value.trim()) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case 'name':
        return value.length >= 2 ? '' : 'Name must be at least 2 characters';
      case 'subject':
        return value.length >= 5 ? '' : 'Subject must be at least 5 characters';
      case 'message':
        return value.length >= 10 ? '' : 'Message must be at least 10 characters';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
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
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm always interested in discussing new opportunities, collaborations, or just having a chat about technology and innovation
          </p>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(234, 179, 8, 0.2)"
                  }}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-yellow-500/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 relative z-10"
                    >
                      <motion.div 
                        className={`${contact.color} p-3 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {contact.icon}
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-400 mb-1">{contact.label}</p>
                        <p className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          {contact.value}
                        </p>
                      </div>
                      {contact.href.startsWith('http') && (
                        <motion.div
                          whileHover={{ x: 3, y: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink size={18} className="text-gray-400 group-hover:text-yellow-400 transition-colors" />
                        </motion.div>
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
                </motion.div>
              ))}
            </div>

            {/* Interactive Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', label: 'Name', type: 'text' },
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'subject', label: 'Subject', type: 'text' },
                    { name: 'message', label: 'Message', type: 'textarea' }
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <motion.div
                        className={`relative bg-slate-700/50 rounded-lg border-2 transition-all duration-300 ${
                          focusedField === field.name 
                            ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent text-white placeholder-gray-400 p-4 pt-6 resize-none"
                            placeholder=" "
                            rows={4}
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent text-white placeholder-gray-400 p-4 pt-6"
                            placeholder=" "
                          />
                        )}
                        
                        {/* Floating Label */}
                        <motion.label
                          className={`absolute left-4 transition-all duration-300 ${
                            focusedField === field.name || formData[field.name as keyof typeof formData]
                              ? 'text-yellow-400 text-sm -translate-y-2'
                              : 'text-gray-400 text-base translate-y-2'
                          }`}
                          animate={{
                            y: focusedField === field.name || formData[field.name as keyof typeof formData] ? -8 : 8,
                            fontSize: focusedField === field.name || formData[field.name as keyof typeof formData] ? '0.875rem' : '1rem'
                          }}
                        >
                          {field.label}
                        </motion.label>
                      </motion.div>
                      
                      {/* Error Message */}
                      {errors[field.name] && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                        >
                          <AlertCircle size={16} />
                          {errors[field.name]}
                        </motion.div>
                      )}
                    </div>
                  ))}
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-slate-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 hover:from-yellow-400 hover:to-yellow-300 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
                
                {/* Success Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-3 mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
                    >
                      <CheckCircle size={20} />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;