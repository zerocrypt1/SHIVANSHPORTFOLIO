import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Expertise', path: '/expertise' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleClick = (path: string) => {
    setMenuOpen(false);
    onNavigate(path);
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo - Also triggers nav */}
        <div onClick={() => handleClick('/')} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 100 100" className="w-full h-full group-hover:rotate-12 transition-transform">
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#omGradient)" strokeWidth="3" />
              <text x="50" y="65" fontSize="48" fill="url(#omGradient)" textAnchor="middle" fontFamily="serif" fontWeight="bold">ॐ</text>
              <defs>
                <linearGradient id="omGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-30 animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Shivansh
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {items.map(item => (
            <button
              key={item.label}
              onClick={() => handleClick(item.path)}
              className={`hover:text-purple-400 transition-colors relative group ${currentPath === item.path ? 'text-purple-400' : 'text-gray-300'}`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-400 transition-all duration-300 ${currentPath === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-purple-500/20 absolute w-full">
          {items.map(item => (
            <button
              key={item.label}
              onClick={() => handleClick(item.path)}
              className="block w-full text-left px-6 py-4 text-white hover:bg-purple-500/10 transition-colors border-b border-purple-500/10"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;