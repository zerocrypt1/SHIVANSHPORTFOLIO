import React, { useEffect, useRef, useState } from 'react';
import { 
  Atom, Shield, Database, Smartphone, Globe, Lock, 
  Search, Layers, Cpu, Code, ExternalLink, Zap 
} from 'lucide-react';

/* --- 1. PARTICLE ENGINE (Consistent with About & Home) --- */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight; // Full scroll height
    };
    window.addEventListener('resize', resize);
    resize();

    const particles: any[] = [];
    const particleCount = 80;
    const colors = ['#a855f7', '#3b82f6', '#ec4899']; // Purple, Blue, Pink

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Trail effect
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
        
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 - dist/1000})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

/* --- 2. PROJECT CARD COMPONENT --- */
/* --- PROJECT CARD COMPONENT --- */
const ProjectCard = ({
  title,
  subtitle,
  desc,
  tech,
  icon: Icon,
  delay,
  color = "purple",
}: any) => {
  const colorMap: any = {
    purple: {
      gradient: "from-purple-500 to-pink-500",
      border: "border-purple-500/30",
      text: "text-purple-300",
      dot: "bg-purple-500",
      dotSoft: "bg-purple-500/50",
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      border: "border-blue-500/30",
      text: "text-blue-300",
      dot: "bg-blue-500",
      dotSoft: "bg-blue-500/50",
    },
    green: {
      gradient: "from-emerald-500 to-teal-500",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
      dot: "bg-emerald-500",
      dotSoft: "bg-emerald-500/50",
    },
    orange: {
      gradient: "from-orange-500 to-red-500",
      border: "border-orange-500/30",
      text: "text-orange-300",
      dot: "bg-orange-500",
      dotSoft: "bg-orange-500/50",
    },
  };

  const c = colorMap[color] || colorMap.purple;

  return (
    <div
      className="group relative h-full opacity-0 animate-reveal"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Glow */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${c.gradient} rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500`}
      />

      {/* Card */}
      <div
        className={`relative h-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border ${c.border} shadow-2xl flex flex-col hover:-translate-y-2 transition-transform duration-500`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-3 rounded-xl bg-white/5 border ${c.border}`}>
            <Icon className={`w-8 h-8 ${c.text}`} />
          </div>

          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
            <div className={`w-1.5 h-1.5 rounded-full ${c.dotSoft}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
          {title}
        </h3>

        <p className={`text-xs font-mono uppercase tracking-widest mb-4 opacity-70 ${c.text}`}>
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {desc}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
          {tech.map((t: string) => (
            <span
              key={t}
              className="px-2 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- 3. MAIN PROJECTS PAGE --- */
const Projects = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30">
      
      {/* Background */}
      <ParticleBackground />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24 animate-fade-in-down">
          <div className="inline-block mb-4 p-2 px-4 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md">
            <span className="text-xs font-mono text-pink-300 tracking-widest flex items-center gap-2">
              <Zap className="w-3 h-3" /> SYSTEM_STATUS: OPERATIONAL
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">WORK</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            From Quantum Research to Enterprise Platforms. 
            <br className="hidden md:block"/>
            Building systems that are Secure by Design.
          </p>
        </div>

        {/* --- REALM 1: QUANTUM & RESEARCH --- */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12 opacity-0 animate-reveal" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
             <h2 className="text-3xl font-bold font-mono text-white">01 // QUANTUM_INITIATIVES</h2>
             <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="BIQUA" 
              subtitle="Converged Security Framework"
              desc="A research-driven initiative converging Blockchain, Innovation, Quantum Computing, and AI. Focused on Post-Quantum Cryptography (PQC) and AI-driven threat intelligence."
              tech={['Quantum', 'AI', 'Blockchain', 'PQC']}
              icon={Atom}
              delay={200}
              color="purple"
            />
            <ProjectCard 
              title="Quantum Cryptanalysis" 
              subtitle="Ethical Research"
              desc="Controlled experiments analyzing the impact of quantum algorithms (Shor's, Grover's) on classical encryption (RSA, ECC). Building future-resistant cryptographic models."
              tech={['Python', 'Qiskit', 'Cryptography', 'Math']}
              icon={Search}
              delay={300}
              color="purple"
            />
            <ProjectCard 
              title="Glocybs Platform" 
              subtitle="Enterprise Security"
              desc="A next-generation security initiative designed to explore, build, and test adaptive security solutions against AI-automated attacks and quantum threats."
              tech={['Security Architecture', 'Threat Intel', 'R&D']}
              icon={Globe}
              delay={400}
              color="purple"
            />
          </div>
        </div>

        {/* --- REALM 2: INFRASTRUCTURE & APPS --- */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12 opacity-0 animate-reveal" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
             <h2 className="text-3xl font-bold font-mono text-white">02 // DIGITAL_INFRASTRUCTURE</h2>
             <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="VIDYAZON" 
              subtitle="Secure Education Platform"
              desc="Scalable education infrastructure with military-grade authentication, OTP verification, and rate-limiting. Designed to protect sensitive student data and identity."
              tech={['React', 'GOLANG', 'Security', 'Cloud']}
              icon={Database}
              delay={600}
              color="blue"
            />
            <ProjectCard 
              title="Find My Emp" 
              subtitle="Workforce Identity"
              desc="A production-grade Flutter application for workforce tracking. Features secure API token handling, role-based access control (RBAC), and encrypted local storage."
              tech={['Flutter', 'Dart', 'API Security', 'Mobile']}
              icon={Smartphone}
              delay={700}
              color="blue"
            />
            <ProjectCard 
              title="Flutter Ecosystem" 
              subtitle="Cross-Platform"
              desc="A suite of mobile applications emphasizing secure state management and data consistency. Bridging frontend usability with rigorous backend security."
              tech={['Mobile', 'UI/UX', 'Secure Storage']}
              icon={Layers}
              delay={800}
              color="blue"
            />
          </div>
        </div>

        {/* --- REALM 3: SECURITY RESEARCH --- */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12 opacity-0 animate-reveal" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
             <h2 className="text-3xl font-bold font-mono text-white">03 // ETHICAL_HACKING</h2>
             <div className="h-px flex-grow bg-gradient-to-r from-orange-500/50 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Netflix & OpenSea" 
              subtitle="Vulnerability Research"
              desc="Conducted responsible security analysis on major enterprise platforms. Identified logic flaws and potential attack vectors in large-scale distributed systems."
              tech={['Bug Bounty', 'Web Sec', 'Ethical Hacking']}
              icon={Shield}
              delay={1000}
              color="orange"
            />
            <ProjectCard 
              title="Web3 Security" 
              subtitle="Blockchain Analysis"
              desc="Investigated Smart Contract risks, wallet authentication flaws, and phishing vectors in decentralized applications (dApps). Focused on 'Off-Chain' vulnerabilities."
              tech={['Solidity', 'Web3', 'Smart Contracts']}
              icon={Lock}
              delay={1100}
              color="orange"
            />
            <ProjectCard 
              title="Experimental Labs" 
              subtitle="GFLEA / OPIPUP"
              desc="Internal experiments testing UI-level exploit prevention and abuse-resistant frontend behavior. Understanding how bad actors exploit user interfaces."
              tech={['UI Security', 'Anti-Abuse', 'Research']}
              icon={Cpu}
              delay={1200}
              color="orange"
            />
          </div>
        </div>

        {/* --- FOOTER STATEMENT --- */}
        <div className="text-center py-20 animate-fade-in-up opacity-0" style={{ animationDelay: '1400ms', animationFillMode: 'forwards' }}>
           <p className="text-2xl font-serif italic text-gray-400 mb-6">
             "I do not measure success by tools used, but by how deeply a system is understood."
           </p>
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-xs font-mono tracking-widest text-gray-300">EXPLORE GITHUB REPOSITORIES</span>
              <ExternalLink className="w-4 h-4 text-white" />
           </div>
        </div>

      </div>

      {/* --- ANIMATIONS --- */}
      <style>{`
        @keyframes reveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { animation: reveal 0.8s ease-out forwards; }
        .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Projects;