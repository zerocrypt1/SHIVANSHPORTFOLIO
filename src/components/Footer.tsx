import React, { useState, useEffect } from 'react';
import { Atom, Activity, Mail, type LucideIcon } from 'lucide-react';

interface FooterProps {
  color: string; // Accepts the dynamic color "rgb(r,g,b)"
  onNavigate: (sectionId: string) => void;
}

const QuantumFooter: React.FC<FooterProps> = ({ color, onNavigate }) => {
  const [sessionTime, setSessionTime] = useState(0);

  // Session Timer
  useEffect(() => {
    const t = setInterval(() => setSessionTime(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Helper: Time Dial Link
  const TimeDialLink = ({ label, target, icon: Icon }: { label: string; target: string; icon: LucideIcon }) => (
    <button 
      onClick={() => onNavigate(target)}
      className="group flex flex-col items-center gap-3 relative p-4 transition-all duration-300"
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
        {/* Static Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-gray-800 group-hover:border-opacity-0 transition-all duration-500" />
        
        {/* Dynamic Theme Color Ring */}
        <div 
          className="absolute inset-0 rounded-full border-t-2 border-b-2 border-transparent transition-all duration-700 group-hover:rotate-180"
          style={{ borderColor: color, opacity: 0.5 }} 
        />
        
        {/* Dashed Gear Ring */}
        <div 
          className="absolute inset-2 rounded-full border-l-2 border-r-2 border-dashed transition-all duration-1000 animate-[spin_10s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite]"
          style={{ borderColor: color, opacity: 0.8 }} 
        />

        <div className="relative z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </div>
      </div>
      <span className="text-[10px] md:text-xs font-mono tracking-widest text-gray-500 group-hover:text-white transition-colors uppercase">
        {label}
      </span>
    </button>
  );

  return (
    <footer 
      className="relative z-10 mt-20 border-t bg-black/80 backdrop-blur-md overflow-hidden transition-colors duration-1000"
      style={{ borderColor: `rgba(${color.replace('rgb(', '').replace(')', '')}, 0.3)` }} // Dynamic Border Color
    >
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

      {/* Dynamic Glow at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px shadow-[0_0_50px_20px_currentColor] opacity-10 pointer-events-none"
        style={{ color: color }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        
        {/* --- TOP: IDENTITY & NAV --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          <button 
            className="flex items-center gap-4 group cursor-pointer text-left" 
            onClick={() => onNavigate('home')}
          >
             <div className="relative w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] transition-all duration-700">
                  <defs>
                    <linearGradient id="omFooterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={color} stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="48" fill="none" stroke="url(#omFooterGradient)" strokeWidth="1" strokeDasharray="10 5" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-3xl font-bold pt-1 transition-colors duration-1000" style={{ color: color }}>ॐ</span>
                </div>
             </div>
             
             <div>
               {/* Name with Dynamic Gradient */}
               <h3 
                 className="text-xl font-bold tracking-tighter bg-clip-text text-transparent transition-all duration-1000"
                 style={{ backgroundImage: `linear-gradient(to right, white, ${color})` }}
               >
                 SHIVANSH MISHRA
               </h3>
               <p className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-70 transition-colors duration-1000" style={{ color: color }}>
                 System_Architect
               </p>
             </div>
          </button>

          <div className="flex gap-4 md:gap-8">
            <TimeDialLink label="Arsenal" target="expertise" icon={Atom} />
            <TimeDialLink label="Missions" target="projects" icon={Activity} />
            <TimeDialLink label="Comms" target="contact" icon={Mail} />
          </div>
        </div>

        {/* --- MIDDLE: STATUS --- */}
        <div 
          className="mt-12 pt-8 border-t grid md:grid-cols-3 gap-6 text-center md:text-left transition-colors duration-1000"
          style={{ borderColor: `rgba(${color.replace('rgb(', '').replace(')', '')}, 0.1)` }}
        >
           
           <div>
             <h4 className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">Current_Objective</h4>
             <p className="text-sm text-gray-300 font-mono">
               Securing the Quantum Future <span className="animate-pulse" style={{ color: color }}>_</span>
             </p>
           </div>

           <div className="flex flex-col items-center justify-center">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                <span className="text-xs font-mono text-gray-400">
                  SESSION: <span className="text-white">{formatTime(sessionTime)}</span>
                </span>
             </div>
           </div>

           <div className="md:text-right">
             <h4 className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">System_Integrity</h4>
             <div className="flex justify-center md:justify-end gap-3 text-[10px] font-mono text-gray-500">
                <span className="hover:text-white transition-colors cursor-crosshair">QUANTUM</span>
                <span>//</span>
                <span className="hover:text-white transition-colors cursor-crosshair">AI_DEFENSE</span>
                <span>//</span>
                <span className="hover:text-white transition-colors cursor-crosshair">WEB3</span>
             </div>
           </div>
        </div>

        {/* --- BOTTOM --- */}
        <div className="mt-8 text-center opacity-40 text-[10px] font-mono tracking-widest">
           © {new Date().getFullYear()} GLOCYBS INIT. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
};

export default QuantumFooter;