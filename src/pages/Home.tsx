import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Terminal,
  Atom, Lock, Brain, ChevronDown, Code, 
  Server, Hash, Activity, Globe, FileCode,
  Cpu, Shield, Zap, type LucideIcon
} from 'lucide-react';

// Keep your import exactly as requested
import QuantumCircle from './QuantumCircle';

/* --- TYPES --- */
interface ExpertiseItem { icon: LucideIcon; title: string; desc: string }
interface ProjectItem { title: string; desc: string; tech: string[] }
interface CryptoToken { symbol: string; value: string; change: number }

/* --- COMPONENT: VEDIC CLOCK (Quantum Wall Clock) --- */
const VedicClock: React.FC<{ color: string }> = ({ color }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const secondsRadius = (time.getSeconds() / 60) * 360;
  const minutesRadius = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hoursRadius = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360;

  return (
<div className="fixed top-28 left-20 z-40 hidden md:flex items-center gap-6 transition-all duration-1000 group select-none">
<div className="relative w-24 h-24 flex items-center justify-center perspective-[500px]">
         <div className="absolute inset-[-10%] rounded-full border border-dashed animate-[spin_8s_linear_infinite]"
              style={{ borderColor: color, opacity: 0.3, transformStyle: 'preserve-3d', transform: 'rotateX(70deg) rotateY(15deg)' }}>
              <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-white shadow-[0_0_15px] shadow-current" style={{color: color}} />
         </div>
         <div className="absolute inset-[-10%] rounded-full border border-dotted animate-[spin_6s_linear_infinite_reverse]"
              style={{ borderColor: color, opacity: 0.4, transformStyle: 'preserve-3d', transform: 'rotateX(70deg) rotateY(-15deg)' }}>
              <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-white shadow-[0_0_15px] shadow-current" style={{color: color}} />
         </div>

         <div className="relative z-10 w-full h-full rounded-full bg-black/80 backdrop-blur-sm border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
           {[0, 90, 180, 270].map(deg => (
             <div key={deg} className="absolute top-0 left-1/2 h-full w-0.5 bg-white/20" style={{ transform: `rotate(${deg}deg)` }}>
               <div className="h-2 w-full bg-white/60 mb-auto"></div>
               <div className="h-2 w-full bg-white/60 mt-auto"></div>
             </div>
           ))}
           <div className="absolute z-30 w-2 h-2 rounded-full bg-white shadow-[0_0_5px_white]"></div>
           <div className="absolute z-20 w-1 h-[30%] bg-white/90 top-1/2 left-1/2 origin-top rounded-full shadow-sm"
                style={{ transform: `translate(-50%, -100%) rotate(${hoursRadius}deg)`, backgroundColor: color }}></div>
           <div className="absolute z-20 w-0.5 h-[42%] bg-white/70 top-1/2 left-1/2 origin-top rounded-full"
                style={{ transform: `translate(-50%, -100%) rotate(${minutesRadius}deg)` }}></div>
           <div className="absolute z-20 w-[1px] h-[48%] bg-red-500 top-1/2 left-1/2 origin-top"
                style={{ transform: `translate(-50%, -100%) rotate(${secondsRadius}deg)` }}></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
               <span className="text-3xl font-bold" style={{ color: color }}>ॐ</span>
            </div>
         </div>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-mono font-bold tracking-widest" style={{ color: color, textShadow: `0 0 10px ${color}` }}>
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
        <div className="text-[10px] tracking-[0.3em] opacity-60 text-white uppercase">
          Kaal_Chakra
        </div>
      </div>
    </div>
  );
};

/* --- THEMES CONFIGURATION --- */
const THEMES = [
  { name: 'QUANTUM_REALM', mode: 'UNIVERSE', rgbP: "139, 92, 246", rgbS: "56, 189, 248", bg: { r: 2, g: 6, b: 23 } },
  { name: 'RED_ALERT', mode: 'CHAOS', rgbP: "239, 68, 68", rgbS: "245, 158, 11", bg: { r: 25, g: 0, b: 0 } },
  { name: 'MATRIX_CORE', mode: 'HASH', rgbP: "34, 197, 94", rgbS: "16, 185, 129", bg: { r: 0, g: 20, b: 0 } },
  { name: 'CYBER_VOID', mode: 'AI_NODES', rgbP: "234, 179, 8", rgbS: "255, 255, 255", bg: { r: 10, g: 10, b: 20 } }
];

/* --- CODE CONTENT CONSTANTS --- */
const CODE_FILES = [
  {
    name: 'identity.sol',
    lang: 'solidity',
    icon: FileCode,
    content: (color: string) => (
      <>
        <span className="text-blue-400">contract</span> <span className="text-yellow-300">ShivanshProfile</span> {'{'}<br/>
        &nbsp;&nbsp;<span className="text-blue-400">string public</span> constant <span className="text-purple-400">ROLE</span> = <span className="text-green-400">"Founder & Director at Glocybs"</span>;<br/>
        &nbsp;&nbsp;<span className="text-blue-400">string[]</span> <span className="text-red-400">skills</span> = [<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"Ethical Hacker"</span>,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"Cybersecurity Expert"</span>,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"Quantum Computing Innovator"</span>,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"Emerging Tech Leader"</span><br/>
        &nbsp;&nbsp;];<br/>
        <br/>
        &nbsp;&nbsp;<span className="text-gray-500">// Deploying the future...</span><br/>
        &nbsp;&nbsp;<span className="text-blue-400">constructor</span>() {'{'}<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">emit</span> <span className="text-yellow-300">VisionDeployed</span>(<span className="text-green-400">"Securing Tomorrow"</span>);<br/>
        &nbsp;&nbsp;{'}'}<br/>
        {'}'}
      </>
    )
  },
  {
    name: 'mindset.py',
    lang: 'python',
    icon: Brain,
    content: (color: string) => (
      <>
        <span className="text-purple-400">class</span> <span className="text-yellow-300">Innovator</span>:<br/>
        &nbsp;&nbsp;<span className="text-blue-400">def</span> <span className="text-yellow-300">__init__</span>(self):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;self.passion = <span className="text-green-400">"AI & Machine Learning"</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;self.drive = <span className="text-orange-400">float</span>(<span className="text-green-400">'inf'</span>)<br/>
        <br/>
        &nbsp;&nbsp;<span className="text-blue-400">def</span> <span className="text-yellow-300">solve_problem</span>(self, complex_issue):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">while</span> <span className="text-blue-300">True</span>:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">try</span>:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return <span className="text-yellow-300">innovate</span>(complex_issue)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">except</span> Failure:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">learn_and_retry</span>()<br/>
      </>
    )
  },
  {
    name: 'vision.go',
    lang: 'go',
    icon: Zap,
    content: (color: string) => (
      <>
        <span className="text-purple-400">package</span> main<br/>
        <span className="text-purple-400">import</span> (<span className="text-green-400">"glocybs"</span>; <span className="text-green-400">"future"</span>)<br/>
        <br/>
        <span className="text-blue-400">func</span> <span className="text-yellow-300">main</span>() {'{'}<br/>
        &nbsp;&nbsp;<span className="text-gray-500">// High performance execution</span><br/>
        &nbsp;&nbsp;<span className="text-blue-300">go</span> glocybs.<span className="text-yellow-300">Launch</span>(<span className="text-green-400">"Quantum_Defense_Grid"</span>)<br/>
        <br/>
        &nbsp;&nbsp;<span className="text-blue-400">if</span> err := future.<span className="text-yellow-300">Secure</span>(); err != <span className="text-blue-400">nil</span> {'{'}<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">panic</span>(<span className="text-green-400">"Security Compromised"</span>)<br/>
        &nbsp;&nbsp;{'}'}<br/>
        &nbsp;&nbsp;fmt.<span className="text-yellow-300">Println</span>(<span className="text-green-400">"System: OPTIMAL"</span>)<br/>
        {'}'}
      </>
    )
  },
  {
    name: 'core.rs',
    lang: 'rust',
    icon: Shield,
    content: (color: string) => (
      <>
        <span className="text-blue-400">fn</span> <span className="text-yellow-300">main</span>() {'{'}<br/>
        &nbsp;&nbsp;<span className="text-blue-400">let</span> skills = <span className="text-purple-400">vec!</span>[<span className="text-green-400">"Rust"</span>, <span className="text-green-400">"Go"</span>, <span className="text-green-400">"Solidity"</span>];<br/>
        &nbsp;&nbsp;<span className="text-blue-400">let</span> target = <span className="text-green-400">"Safe Ecosystems"</span>;<br/>
        <br/>
        &nbsp;&nbsp;<span className="text-blue-400">match</span> secure_network(&skills) {'{'}<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">Ok</span>(_) ={'>'} println!(<span className="text-green-400">"{} locked & loaded 🔒"</span>, target),<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">Err</span>(e) ={'>'} eprintln!(<span className="text-red-400">"Threat detected: {}"</span>, e),<br/>
        &nbsp;&nbsp;{'}'}<br/>
        {'}'}
      </>
    )
  }
];

const Portfolio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const [progress, setProgress] = useState(0); 
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeFile, setActiveFile] = useState(0); // For code tabs
  
  // Sidebars Data
  const [tokens, setTokens] = useState<CryptoToken[]>([
    { symbol: 'QBIT', value: '0.0042', change: 2.4 },
    { symbol: 'GLO', value: '124.55', change: 1.1 },
    { symbol: 'RUST', value: '99.99', change: -0.5 },
  ]);
  const [cpuLoad, setCpuLoad] = useState(0);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);

  const currentTheme = THEMES[themeIndex];
  const currentColor = `rgb(${currentTheme.rgbP})`;

  /* --- ANIMATION LOOPS --- */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);

    const cycleDuration = 5000;
    const intervalTick = 50;
    let elapsed = 0;

    const mainInterval = setInterval(() => {
      elapsed += intervalTick;
      setProgress((elapsed / cycleDuration) * 100);

      if (elapsed >= cycleDuration) {
        elapsed = 0;
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
        setThemeIndex((prev) => (prev + 1) % THEMES.length);
      }
    }, intervalTick);

    const dataInterval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 30) + 40);
      setTokens(prev => prev.map(t => ({
        ...t,
        value: (parseFloat(t.value) + (Math.random() - 0.5)).toFixed(4),
        change: t.change + (Math.random() - 0.5)
      })));
    }, 800);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(mainInterval);
      clearInterval(dataInterval);
    };
  }, []);

  /* --- MULTIVERSE BACKGROUND ENGINE --- */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const matrixChars = "0101010101XYZ";
    const quantumChars = "ΨΦΣπΩµ★●";
    const chaosChars = "⚠⚡☠⛔ERROR";
    const fillerChars = "QWERYUIOPASDFGHJKLZXCVBNM1234567890@#$%&";

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      val: string;
      isNoise: boolean;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 12 + 8;
        this.val = "0";
        this.isNoise = Math.random() > 0.65;
      }

      update(mode: string) {
        if (this.isNoise) {
          this.y += 0.5;
          if (this.y > canvas!.height) this.y = 0;
          if (Math.random() > 0.99) this.val = fillerChars[Math.floor(Math.random()*fillerChars.length)];
          return;
        }
        if (mode === 'HASH') {
          this.y += 8; 
          if (this.y > canvas!.height) {
             this.y = 0;
             this.x = Math.floor(Math.random() * canvas!.width / 20) * 20;
          }
          this.val = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        } else if (mode === 'CHAOS') {
          this.x += (Math.random() - 0.5) * 15;
          this.y += (Math.random() - 0.5) * 15;
          this.val = chaosChars[Math.floor(Math.random() * chaosChars.length)];
        } else if (mode === 'AI_NODES') {
          this.x += this.vx * 0.5;
          this.y += this.vy * 0.5;
          this.val = "•"; 
        } else {
          this.x += this.vx;
          this.y += this.vy;
          this.val = quantumChars[Math.floor(Math.random() * quantumChars.length)];
        }

        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw(color: string, mode: string) {
        if (!ctx) return;
        if (this.isNoise) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
          ctx.font = "10px monospace";
          ctx.fillText(this.val, this.x, this.y);
        } else {
          ctx.fillStyle = color;
          if (mode === 'AI_NODES') {
             ctx.beginPath();
             ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
             ctx.fill();
          } else {
             ctx.font = `${this.size}px monospace`;
             ctx.fillText(this.val, this.x, this.y);
          }
        }
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount + 60 }, () => new Particle());

    const animate = () => {
      if (!ctx) return;
      const theme = THEMES[themeIndex];
      const pColor = `rgba(${theme.rgbP}, 0.8)`;
      
      ctx.fillStyle = `rgba(${theme.bg.r}, ${theme.bg.g}, ${theme.bg.b}, 0.25)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.update(theme.mode);
        p.draw(pColor, theme.mode);
        if (!p.isNoise && (theme.mode === 'AI_NODES' || theme.mode === 'UNIVERSE')) {
           for (let j = i + 1; j < particles.length; j++) {
             if (particles[j].isNoise) continue;
             const dx = p.x - particles[j].x;
             const dy = p.y - particles[j].y;
             const dist = Math.sqrt(dx * dx + dy * dy);
             if (dist < 120) {
               ctx.beginPath();
               ctx.strokeStyle = `rgba(${theme.rgbS}, ${0.15 - dist / 800})`;
               ctx.lineWidth = 0.5;
               ctx.moveTo(p.x, p.y);
               ctx.lineTo(particles[j].x, particles[j].y);
               ctx.stroke();
             }
           }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, [themeIndex]);

  /* --- DATA --- */
  const expertise: ExpertiseItem[] = [
    { icon: Atom, title: 'Quantum Computing', desc: 'QKD & Post-Quantum Cryptography' },
    { icon: Lock, title: 'Ethical Hacking', desc: 'Red Teaming & Advanced Threat Analysis' },
    { icon: Brain, title: 'AI Defense', desc: 'Adversarial Machine Learning Protection' },
    { icon: Code, title: 'Secure Coding', desc: 'Rust, Go, Solidity, C++ Architecture' },
    { icon: Server, title: 'Infrastructure', desc: 'Hardened Cloud Environments' },
    { icon: Globe, title: 'Network Analysis', desc: 'Deep Packet Inspection & Forensics' }
  ];

  const projects: ProjectItem[] = [
    { title: 'BIQUA Framework', desc: 'Proprietary Quantum Key Distribution simulator.', tech: ['Rust', 'Physics'] },
    { title: 'Glocybs Core', desc: 'Enterprise cybersecurity monitoring suite.', tech: ['React', 'AI/ML'] },
    { title: 'Neural Firewall', desc: 'AI-driven packet filtering system.', tech: ['Python', 'TensorFlow'] }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans transition-colors duration-1000"
         style={{ backgroundColor: `rgb(${currentTheme.bg.r}, ${currentTheme.bg.g}, ${currentTheme.bg.b})` }}>
      
      {/* 1. BACKGROUND CANVAS */}
      <canvas ref={bgCanvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* 2. GLITCH OVERLAY */}
      <div 
        className="fixed inset-0 z-[150] pointer-events-none bg-white mix-blend-difference transition-opacity duration-200"
        style={{ opacity: glitchActive ? 0.2 : 0 }}
      />

      {/* 3. PROGRESS BAR */}
      <div className="fixed top-16 left-0 w-full h-1 z-[140] bg-gray-800/50">
        <div 
          className="h-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%`, backgroundColor: currentColor, boxShadow: `0 0 10px ${currentColor}` }}
        />
      </div>

      {/* 4. VEDIC CLOCK */}
      <VedicClock color={currentColor} />

      {/* 5. SIDEBAR: DIAGNOSTICS */}
      <div className="fixed left-0 top-0 bottom-0 w-16 hidden lg:flex flex-col items-center justify-center border-r border-white/5 z-40 bg-black/20 backdrop-blur-sm">
        <div className="flex-1 flex flex-col justify-around py-20 w-full text-center">
            <div className="group relative">
                <Activity className="w-6 h-6 mx-auto mb-2 opacity-70" style={{ color: currentColor }} />
                <span className="text-[10px] font-mono block text-gray-400">CPU</span>
                <span className="text-xs font-bold font-mono" style={{ color: currentColor }}>{cpuLoad}%</span>
            </div>
            <div className="h-48 overflow-hidden text-[10px] font-mono leading-3 opacity-30 text-center select-none" style={{ color: currentColor }}>
                {Array.from({length: 20}).map((_, i) => <div key={i}>{Math.random() > 0.5 ? '1' : '0'}</div>)}
            </div>
            <div className="group">
                <Server className="w-6 h-6 mx-auto mb-2 opacity-70" style={{ color: currentColor }} />
                <span className="text-[10px] font-mono block text-gray-400">MEM</span>
                <span className="text-[10px] font-mono" style={{ color: currentColor }}>0x{Math.floor(Math.random()*999)}F</span>
            </div>
        </div>
      </div>

      {/* 6. SIDEBAR: BLOCKCHAIN */}
      <div className="fixed right-0 top-0 bottom-0 w-48 hidden lg:flex flex-col border-l border-white/5 z-40 bg-black/20 backdrop-blur-sm pt-20">
         <div className="p-4 border-b border-white/5">
             <div className="flex items-center gap-2 mb-2">
                 <Hash className="w-4 h-4" style={{ color: currentColor }} />
                 <span className="text-xs font-bold font-mono tracking-widest">LIVE_NET</span>
             </div>
             <div className="text-[10px] text-gray-500 font-mono">BLOCK: #8829{Math.floor(progress)}</div>
         </div>
         <div className="flex-1 p-4 space-y-4">
             {tokens.map((token, i) => (
                 <div key={i} className="border-b border-white/5 pb-2">
                     <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-xs font-mono">{token.symbol}</span>
                         <span className={`text-[10px] font-mono ${token.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                             {token.change > 0 ? '+' : ''}{token.change.toFixed(2)}%
                         </span>
                     </div>
                     <div className="text-sm font-mono opacity-80" style={{ color: currentColor }}>
                         {token.value}
                     </div>
                 </div>
             ))}
         </div>
         <div className="p-4 text-[10px] font-mono text-center opacity-50"><span className="animate-pulse">●</span> SYNCED</div>
      </div>

      {/* 7. MAIN PAGE CONTENT */}
      <div className="relative z-10 lg:mx-16 pt-28">

        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 pb-20">
          <div className="text-center w-full max-w-5xl">
            
            <div style={{ transform: `translateY(${scrollY * 0.2}px)` }} className="transition-all duration-1000 mb-8">
               <QuantumCircle primary={currentTheme.rgbP} secondary={currentTheme.rgbS} />
            </div>

            {/* SOCIAL HUB (Replaces Footer Links) */}
            <div className="flex justify-center gap-6 mb-12">
               {[Github, Linkedin, Mail, Terminal].map((Icon, i) => (
                <a key={i} href="#" className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110 group">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
               ))}
            </div>

            {/* TABBED CODE TERMINAL */}
            <div className="mx-auto max-w-4xl bg-black/90 rounded-lg border border-gray-800 shadow-2xl overflow-hidden relative text-left">
                {/* Terminal Header */}
                <div className="flex items-center bg-gray-900/50 border-b border-gray-800 px-4">
                   <div className="flex gap-2 mr-6">
                       <div className="w-3 h-3 rounded-full bg-red-600"/>
                       <div className="w-3 h-3 rounded-full bg-yellow-600"/>
                       <div className="w-3 h-3 rounded-full bg-green-600"/>
                   </div>
                   {/* File Tabs */}
                   <div className="flex overflow-x-auto scrollbar-hide">
                     {CODE_FILES.map((file, i) => (
                       <button 
                         key={file.name}
                         onClick={() => setActiveFile(i)}
                         className={`flex items-center gap-2 px-4 py-3 text-xs font-mono border-r border-gray-800 transition-colors ${activeFile === i ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-300'}`}
                       >
                         <file.icon className="w-3 h-3" />
                         {file.name}
                       </button>
                     ))}
                   </div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-xs md:text-sm leading-6 h-[320px] overflow-y-auto">
                    {CODE_FILES[activeFile].content(currentColor)}
                </div>
            </div>

            <div className="mt-12 animate-bounce">
               <ChevronDown className="w-8 h-8 mx-auto opacity-50" style={{ color: currentColor }} />
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="py-24 px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white font-mono" style={{ textShadow: `0 0 20px ${currentColor}` }}>
            &lt;Technical_Arsenal /&gt;
          </h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((e, i) => (
              <div key={i} className="group p-8 rounded-sm border backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
                style={{ borderColor: `rgba(${currentTheme.rgbP}, 0.3)`, backgroundColor: `rgba(2, 6, 23, 0.4)` }}>
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-500" style={{ borderColor: currentColor }}/>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-500" style={{ borderColor: currentColor }}/>
                <div className="w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-colors duration-500"
                  style={{ backgroundColor: `rgba(${currentTheme.rgbP}, 0.1)` }}>
                  <e.icon className="w-7 h-7 transition-colors duration-500" style={{ color: currentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white font-mono">{e.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 px-6 pb-40">
          <h2 className="text-4xl font-bold text-center mb-16 text-white font-mono" style={{ textShadow: `0 0 20px ${currentColor}` }}>
            &lt;Mission_Log /&gt;
          </h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="relative p-8 rounded-sm border overflow-hidden group transition-all duration-500 hover:shadow-2xl"
                style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', borderColor: `rgba(${currentTheme.rgbS}, 0.2)` }}>
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, transparent, ${currentColor}, transparent)`, transform: 'translateY(-100%)', animation: 'scan 2s linear infinite' }} />
                <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300 group-hover:text-slate-200 font-mono">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-6 h-12">{p.desc}</p>
                <div className="flex gap-2 flex-wrap mt-auto">
                  {p.tech.map(t => (
                    <span key={t} className="px-3 py-1 text-xs font-mono rounded-sm border transition-colors duration-500"
                      style={{ borderColor: `rgba(${currentTheme.rgbP}, 0.3)`, color: `rgb(${currentTheme.rgbS})`, backgroundColor: `rgba(${currentTheme.rgbP}, 0.05)` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NO FOOTER HERE AS REQUESTED */}
        
        <style>{`
          @keyframes glow { 0%,100%{ filter: drop-shadow(0 0 10px rgba(${currentTheme.rgbP},0.5)); } 50%{ filter: drop-shadow(0 0 20px rgba(${currentTheme.rgbS},0.8)); } }
          @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};

export default Portfolio;