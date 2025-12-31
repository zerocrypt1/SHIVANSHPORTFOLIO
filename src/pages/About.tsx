import React, { useEffect, useRef, useState } from 'react';
import { 
  Terminal, Cpu, Shield, Brain, Globe, Lock, 
  Code, Zap, Layers, Hash, Activity 
} from 'lucide-react';

/* --- 1. BACKGROUND ENGINE (Quantum Particles) --- */
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
    const particleCount = 100;
    const colors = ['#8b5cf6', '#38bdf8', '#ec4899']; // Purple, Cyan, Pink

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connections
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 - dist/1000})`;
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

/* --- 2. SECTION COMPONENT --- */
const StorySection = ({ title, icon: Icon, children, delay }: any) => {
  return (
    <div 
      className="relative group mb-24 opacity-0 animate-reveal"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
          <div className="p-3 bg-white/5 rounded-lg border border-purple-500/30">
            <Icon className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-sans">
          {children}
        </div>

        {/* Decor */}
        <div className="absolute top-4 right-4 flex gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500/50" />
           <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
           <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>
    </div>
  );
};

/* --- 3. MAIN COMPONENT --- */
const About = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30">
      
      {/* Background */}
      <ParticleBackground />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-32 animate-fade-in-down">
          <div className="inline-block mb-4 p-2 px-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
            <span className="text-xs font-mono text-purple-300 tracking-widest">
              SYSTEM_ID: SHIVANSH_MISHRA
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">ME</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light border-l-2 border-purple-500 pl-6 text-left md:text-center md:border-l-0 md:border-b-2 md:pb-6">
            Founder & Director @ Glocybs | Ethical Hacker | Quantum Innovator
          </p>
        </div>

        {/* --- SECTIONS --- */}

        {/* 1. INTRODUCTION */}
        <StorySection title="The Identity" icon={Terminal} delay={100}>
          <p>
            I am <strong className="text-white">Shivansh Mishra</strong>, Founder and Director of <span className="text-cyan-400">Glocybs</span>, an independent technology-driven initiative focused on building the future of cybersecurity, quantum computing, and intelligent systems.
          </p>
          <p>
            My work sits at the intersection of ethical hacking, quantum security, artificial intelligence, and next-generation software engineering. I believe innovation isn't just about speed or scale—it's about <span className="text-purple-300">trust, resilience, and responsibility</span>.
          </p>
          <p>
            From an early stage, I was drawn to the "why" beneath the software. Not just how it behaves, but where it breaks. This curiosity evolved into a deep obsession with security architecture and cryptographic systems.
          </p>
        </StorySection>

        {/* 2. FOUNDATION */}
        <StorySection title="Systems Thinking" icon={Layers} delay={200}>
          <p>
            My journey began with a mindset: <strong>Systems Thinking</strong>. Technology must be understood holistically—from hardware logic to human behavior.
          </p>
          <div className="pl-4 border-l-2 border-purple-500/30 my-6 italic text-gray-400">
            "A system is only as strong as its weakest assumption."
          </div>
          <p>
            This realization pushed me toward ethical hacking. Through hands-on experimentation, I developed expertise in:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 mt-4">
            {['Penetration Testing', 'Threat Modeling', 'Infrastructure Design', 'Cryptographic Protocols'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-mono text-cyan-300">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> {item}
              </li>
            ))}
          </ul>
        </StorySection>

        {/* 3. QUANTUM ERA */}
        <StorySection title="The Quantum Era" icon={Atom} delay={300}>
          <p>
            As classical security matured, I realized widely used systems (RSA, ECC) are vulnerable to the impending quantum shift. Rather than fearing this change, I chose to study it from a security-first standpoint.
          </p>
          <p>
            My research focuses on <strong>Post-Quantum Cryptography</strong> and <strong>Quantum Key Distribution (QKD)</strong>. I have led controlled, ethical research initiatives exploring how quantum algorithms affect encryption and hashing.
          </p>
          <p className="text-pink-300">
            Quantum computing isn't just faster computation; it is a paradigm shift in security assumptions. My goal is to bridge that gap responsibly.
          </p>
        </StorySection>

        {/* 4. GLOCYBS & VISION */}
        <StorySection title="Glocybs: The Vision" icon={Globe} delay={400}>
          <p>
            I founded <strong>Glocybs</strong> with a clear philosophy: Security should evolve at the same pace as technology. It is a research-driven initiative exploring next-gen solutions.
          </p>
          <div className="bg-black/40 p-6 rounded-lg border border-white/5 mt-4">
            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest">Core Principles</h4>
            <div className="flex flex-wrap gap-3">
              {['Security by Design', 'Future Resistance', 'Ethical Responsibility'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </StorySection>

        {/* 5. BIQUA */}
        <StorySection title="BIQUA Framework" icon={Hash} delay={500}>
          <p>
            One of my key initiatives is <strong>BIQUA</strong>—a convergence of <span className="text-yellow-400">Blockchain, Innovation, Quantum Computing, and AI</span>.
          </p>
          <p>
            Modern security cannot exist in silos. BIQUA explores how these technologies combine to create adaptive, resilient systems. It is not hype; it is a long-term engineering vision for a world where AI generates attacks at scale and quantum computers threaten cryptography.
          </p>
        </StorySection>

        {/* 6. AI & SECURITY */}
        <StorySection title="Secure Intelligence" icon={Brain} delay={600}>
          <p>
            AI is powerful, but dangerous without control. My work focuses on <strong>Security-Aware Intelligence</strong>—preventing adversarial attacks, securing AI pipelines, and designing auditable systems.
          </p>
          <p>
            Blind intelligence is a liability. I believe AI must be secure, interpretable, and aligned with human intent.
          </p>
        </StorySection>

        {/* 7. TECH STACK */}
        <StorySection title="Engineering Stack" icon={Code} delay={700}>
          <p>
            I approach engineering with a production-first mindset. Research must survive real-world conditions. My weapon of choice:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-white/5 rounded border border-orange-500/30">
              <h4 className="font-bold text-orange-400 mb-2">Rust</h4>
              <p className="text-xs text-gray-400">Memory-safe, high-performance security components.</p>
            </div>
            <div className="p-4 bg-white/5 rounded border border-cyan-500/30">
              <h4 className="font-bold text-cyan-400 mb-2">Go (Golang)</h4>
              <p className="text-xs text-gray-400">Scalable backend systems and infrastructure tooling.</p>
            </div>
            <div className="p-4 bg-white/5 rounded border border-blue-500/30">
              <h4 className="font-bold text-blue-400 mb-2">Solidity</h4>
              <p className="text-xs text-gray-400">Secure smart contracts and blockchain logic.</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">"Every line of code is a security decision."</p>
        </StorySection>

        {/* 8. ETHICS & MENTORSHIP */}
        <StorySection title="Ethics & Mentorship" icon={Shield} delay={800}>
          <p>
            Trust is the foundation of technology. Without ethics, innovation becomes exploitation. I am deeply committed to ethical boundaries—all my research is conducted in controlled environments with explicit authorization.
          </p>
          <p className="mt-4">
            Alongside technical work, I value <strong>Education</strong>. I actively focus on simplifying complex concepts and teaching security-first thinking. The future depends on people who understand <em>why</em> security matters.
          </p>
        </StorySection>

        {/* --- FOOTER / CONCLUSION --- */}
        <div className="mt-32 mb-20 text-center animate-fade-in-up">
           <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8" />
           <p className="text-2xl font-serif italic text-gray-300 mb-6">
             "I see technology as a responsibility, not just an opportunity."
           </p>
           <h3 className="text-4xl font-bold text-white tracking-widest uppercase">
             Shivansh Mishra
           </h3>
           <p className="text-sm font-mono text-gray-500 mt-2">
             SECURING THE FUTURE BEFORE IT ARRIVES
           </p>
        </div>

      </div>

      {/* --- GLOBAL STYLES --- */}
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

// Lucide Icon Helper (Since Atom isn't exported directly sometimes, we create a placeholder if needed, but assuming standard lucide-react import works)
const Atom = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>
);

export default About;