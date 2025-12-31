import React, { useEffect, useRef, useState } from 'react';
import { 
  Github, Linkedin, Mail, Terminal, Instagram, 
  BookOpen, Copy, Check, Cpu, Send, Globe 
} from 'lucide-react';

// --- IMAGE IMPORT ---
// Ensure your folder structure matches this path. 
// If "assets" is in the src folder, it might be '../assets/image.png'
import profilePic from '../assets/image.png'; 

/* --- 1. PARTICLE ENGINE --- */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles: any[] = [];
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        color: '#a855f7', // Purple base
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

/* --- 2. NPM TERMINAL COMPONENT --- */
const NpmTerminal = () => {
  const [copied, setCopied] = useState(false);
  const command = "npx meet-shivansh";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative group">
      {/* Terminal Header */}
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs font-mono text-gray-500">bash — 80x24</div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm">
        
        {/* Command Line */}
        <div className="flex items-center gap-3 mb-4 text-green-400">
          <span className="text-purple-400">➜</span>
          <span className="text-cyan-400">~</span>
          <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-white/50 pr-1">
            {command}
          </span>
        </div>

        {/* JSON Output Simulation */}
        <div className="space-y-1 animate-fade-in-delayed opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          <div className="text-gray-400">{`{`}</div>
          <div className="pl-4">
            <span className="text-blue-400">"name"</span>: <span className="text-yellow-300">"Shivansh Mishra"</span>,
          </div>
          <div className="pl-4">
            <span className="text-blue-400">"role"</span>: <span className="text-yellow-300">"CEO @ GLOCYBS"</span>,
          </div>
          <div className="pl-4">
            <span className="text-blue-400">"stack"</span>: [<span className="text-green-400">"Rust"</span>, <span className="text-green-400">"Go"</span>, <span className="text-green-400">"Solidity"</span>],
          </div>
          <div className="pl-4">
            <span className="text-blue-400">"mission"</span>: <span className="text-yellow-300">"Securing the Quantum Future"</span>
          </div>
          <div className="text-gray-400">{`}`}</div>
          
          <div className="mt-4 text-gray-500">
            <span className="text-green-500">✔</span> Package installed successfully.
          </div>
        </div>

        {/* Copy Button Overlay */}
        <button 
          onClick={handleCopy}
          className="absolute top-12 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors group-hover:opacity-100 opacity-0"
          title="Copy Command"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
    </div>
  );
};

/* --- 3. SOCIAL LINK CARD --- */
const SocialCard = ({ icon: Icon, label, handle, url, color, delay }: any) => {
  
  const colorMap: Record<string, string> = {
    purple: "hover:border-purple-500/50 hover:shadow-purple-500/20 text-purple-400",
    blue: "hover:border-blue-500/50 hover:shadow-blue-500/20 text-blue-400",
    pink: "hover:border-pink-500/50 hover:shadow-pink-500/20 text-pink-400",
    cyan: "hover:border-cyan-500/50 hover:shadow-cyan-500/20 text-cyan-400",
    green: "hover:border-emerald-500/50 hover:shadow-emerald-500/20 text-emerald-400",
  };

  const selectedColorClass = colorMap[color as string] || colorMap.purple;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 p-4 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/80 shadow-lg opacity-0 animate-reveal ${selectedColorClass}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="p-3 bg-white/5 rounded-full">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-200">{label}</h4>
        <p className="text-xs font-mono opacity-60">@{handle}</p>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <Globe className="w-4 h-4" />
      </div>
    </a>
  );
};

/* --- 4. MAIN CONTACT PAGE --- */
const Contact = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30 flex items-center justify-center">
      
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-6xl px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT COLUMN: PROFILE & TERMINAL --- */}
        <div className="space-y-12">
          
          {/* Holographic Profile Header */}
          <div className="flex items-center gap-6 animate-fade-in-down">
            {/* PROFILE PICTURE CONTAINER */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 group">
               {/* Layer 1: Deep pulsing blur */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-cyan-900 rounded-full blur-md opacity-50 animate-pulse" />
              
              {/* Layer 2: Rotating Cyber Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 rounded-full blur-sm opacity-80 animate-spin-slow"></div>

              {/* IMAGE: Grayscale removed, added z-index to sit on top of rings */}
              <img 
                src={profilePic}
                alt="Shivansh Mishra"
                className="relative z-10 w-full h-full object-cover rounded-full border-2 border-white/20 p-1 bg-black/50 transition-all duration-500"
              />
              
              {/* Online Status Indicator */}
              <div className="absolute z-20 bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-slate-950 rounded-full" title="Online" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Shivansh Mishra
              </h1>
              <div className="flex items-center gap-2 mt-2 text-purple-300 font-mono text-sm">
                 <Cpu className="w-4 h-4" />
                 <span>CEO @ GLOCYBS</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Quantum Security | Ethical Hacking
              </p>
            </div>
          </div>

          {/* NPM Terminal */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
             <NpmTerminal />
             <p className="text-center text-xs text-gray-500 mt-4 font-mono">
                {`// Run this command to fetch my developer card`}
             </p>
          </div>

        </div>

        {/* --- RIGHT COLUMN: CONNECT LINKS --- */}
        <div className="relative">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Initialize Uplink</h2>
            <p className="text-gray-400">Select a secure channel to establish communication.</p>
          </div>

          <div className="grid gap-4">
            
            <SocialCard 
              icon={Github} 
              label="GitHub (Main)" 
              handle="ZEROCRYPT1" 
              url="https://github.com/ZEROCRYPT1" 
              color="purple" 
              delay={100} 
            />
            
            <SocialCard 
              icon={Github} 
              label="GitHub (Secondary)" 
              handle="SHIVANSH2241" 
              url="https://github.com/SHIVANSH2241" 
              color="blue" 
              delay={200} 
            />

            <SocialCard 
              icon={Linkedin} 
              label="LinkedIn" 
              handle="shivansh-ninja" 
              url="https://www.linkedin.com/in/shivansh-ninja/" 
              color="cyan" 
              delay={300} 
            />

            <SocialCard 
              icon={BookOpen} 
              label="Medium Blog" 
              handle="shivanshm442" 
              url="https://medium.com/@shivanshm442" 
              color="green" 
              delay={400} 
            />

            <SocialCard 
              icon={Instagram} 
              label="Instagram" 
              handle="SHIVANSH7940" 
              url="https://instagram.com/SHIVANSH7940" 
              color="pink" 
              delay={500} 
            />

            <SocialCard 
              icon={Mail} 
              label="Email Transmission" 
              handle="Contact Directly" 
              url="mailto:shivansh@glocybs.com" 
              color="purple" 
              delay={600} 
            />

          </div>

          {/* GLOCYBS BADGE */}
          <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 to-slate-900 rounded-2xl border border-purple-500/20 flex items-center justify-between opacity-0 animate-reveal" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
             <div>
               <h3 className="text-lg font-bold text-white">GLOCYBS</h3>
               <p className="text-xs text-purple-300">Quantum-Resistant Security Initiatives</p>
             </div>
             <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-purple-900/20">
               Visit HQ
             </button>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes reveal {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        /* NEW: Slow spin animation for the ring */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-typing {
          animation: typing 1.5s steps(20, end);
        }
        .animate-reveal {
          animation: reveal 0.6s ease-out forwards;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;