
import React, { useState } from 'react';
import { Menu, X, Brain, GraduationCap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EduVision
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#colleges" className="hover:text-blue-400 transition-colors">Colleges</a>
            <a href="#teachers" className="hover:text-blue-400 transition-colors">Teachers</a>
            <a href="#students" className="hover:text-blue-400 transition-colors">Student Portal</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-colors">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#colleges" className="hover:text-blue-400 transition-colors">Colleges</a>
              <a href="#teachers" className="hover:text-blue-400 transition-colors">Teachers</a>
              <a href="#students" className="hover:text-blue-400 transition-colors">Student Portal</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <div className="flex flex-col space-y-2 pt-4">
                <button className="px-4 py-2 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-colors">
                  Login
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
