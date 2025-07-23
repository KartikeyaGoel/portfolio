import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white py-12 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Kartikeya Goel</h3>
          <p className="text-gray-300 mb-6">
            Computer Science Student • AI Enthusiast • Software Engineer
          </p>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Kartikeya Goel. Built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;