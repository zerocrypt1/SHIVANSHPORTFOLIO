import React, { useEffect, useRef, useState } from 'react';
import { 
  Atom, Shield, Brain, Lock, Code, Terminal, 
  Zap, Server, Blocks, Fingerprint, Network, Cpu 
} from 'lucide-react';

/* --- 1. PARTICLE ENGINE (Consistent Background) --- */
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
    const particleCount = 80;
    const colors = ['#a855f7', '#14b8a6', '#f43f5e']; // Purple, Teal, Rose

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
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

/* --- 2. EXPERTISE CARD COMPONENT --- */
const ExpertiseCard = ({
    title,
    desc,
    skills = [],
    icon: Icon,
    color = "purple",
    delay,
  }: any) => {
    const themeMap: any = {
      red: {
        gradientFrom: "from-red-500",
        gradientTo: "to-orange-500",
        border: "border-red-500/30",
        text: "text-red-400",
        shadow: "group-hover:shadow-red-500/20",
      },
      purple: {
        gradientFrom: "from-purple-500",
        gradientTo: "to-pink-500",
        border: "border-purple-500/30",
        text: "text-purple-400",
        shadow: "group-hover:shadow-purple-500/20",
      },
      cyan: {
        gradientFrom: "from-cyan-500",
        gradientTo: "to-blue-500",
        border: "border-cyan-500/30",
        text: "text-cyan-400",
        shadow: "group-hover:shadow-cyan-500/20",
      },
      green: {
        gradientFrom: "from-emerald-500",
        gradientTo: "to-teal-500",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        shadow: "group-hover:shadow-emerald-500/20",
      },
    };
  
    const theme = themeMap[color] || themeMap.purple;
  
    return (
      <div
        className="group relative opacity-0 animate-reveal h-full"
        style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
      >
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500`}
        />
  
        <div
          className={`relative h-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border ${theme.border} shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${theme.shadow}`}
        >
          {/* Icon */}
          <div className="flex justify-between items-start mb-6">
            <div
              className={`p-3 rounded-xl bg-white/5 border border-white/10 ${theme.text}`}
            >
              {Icon && <Icon className="w-8 h-8" />}
            </div>
          </div>
  
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4">
            {title}
          </h3>
  
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {desc}
          </p>
  
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
            {skills.map((skill: string) => (
              <span
                key={skill}
                className="px-2 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
/* --- 3. MAIN PAGE COMPONENT --- */
const Expertise = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30">
      
      {/* Background */}
      <ParticleBackground />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24 animate-fade-in-down">
          <div className="inline-block mb-4 p-2 px-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
             <span className="text-xs font-mono text-purple-300 tracking-widest flex items-center gap-2">
                <Brain className="w-3 h-3" /> NEURAL_NET: CONNECTED
             </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">EXPERTISE</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            I approach technology as a connected ecosystem—where software, infrastructure, cryptography, and human behavior all influence security outcomes.
          </p>
        </div>

        {/* --- DOMAIN GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. Cybersecurity */}
          <ExpertiseCard 
            title="Cybersecurity & Hacking"
            icon={Shield}
            color="red"
            delay={100}
            desc="Security-first system design and ethical hacking. Focusing on vulnerability analysis, threat modeling, and understanding how architecture decisions influence security posture."
            skills={['Penetration Testing', 'Threat Modeling', 'API Security', 'Auth Flows']}
          />

          {/* 2. Quantum Computing */}
          <ExpertiseCard 
            title="Quantum Security"
            icon={Atom}
            color="purple"
            delay={200}
            desc={<span>Researching how quantum algorithms impact classical cryptography. Preparing systems for a post-quantum future via 

[Image of Quantum Key Distribution diagram]
 and PQC.</span>}
            skills={['QKD', 'Post-Quantum Crypto', 'RSA/ECC Analysis', 'Future-Proofing']}
          />

          {/* 3. AI Security */}
          <ExpertiseCard 
            title="AI & Intelligence"
            icon={Brain}
            color="purple"
            delay={300}
            desc={<span>Securing AI pipelines against . Designing explainable systems where intelligence strengthens security rather than becoming a liability.</span>}
            skills={['Adversarial Defense', 'ML Ops Security', 'Anomaly Detection', 'Auditable AI']}
          />

          {/* 4. Secure Engineering */}
          <ExpertiseCard 
            title="Secure Engineering"
            icon={Code}
            color="cyan"
            delay={400}
            desc="Production-grade development with a focus on correctness and minimal attack surface. Every line of code is a security decision."
            skills={['Rust (Memory Safe)', 'Go (Scalable)', 'Solidity', 'System Design']}
          />

          {/* 5. Cryptography */}
          <ExpertiseCard 
            title="Cryptography"
            icon={Lock}
            color="cyan"
            delay={500}
            desc="Deep analysis of encryption, hashing, and authentication under real-world constraints. Focusing on implementation correctness and key management."
            skills={['Encryption Analysis', 'Hashing', 'Key Exchange', 'Protocol Security']}
          />

          {/* 6. Blockchain/Web3 */}
          <ExpertiseCard 
            title="Blockchain & Web3"
            icon={Blocks}
            color="green"
            delay={600}
            desc={<span>Analyzing 

[Image of smart contract architecture]
 risks, wallet authentication flows, and decentralized application security. Understanding on-chain vs off-chain boundaries.</span>}
            skills={['Smart Contracts', 'Wallet Auth', 'dApp Security', 'Web3 Logic']}
          />

          {/* 7. System Architecture */}
          <ExpertiseCard 
            title="System Architecture"
            icon={Server}
            color="green"
            delay={700}
            desc="Designing architectures that anticipate scale, abuse, and failure. Focusing on long-term resilience for cloud infrastructure and authentication systems."
            skills={['Cloud Security', 'Scalability', 'Resilience', 'Future-Ready']}
          />

           {/* 8. Research & Ethics */}
           <ExpertiseCard 
            title="Research & Ethics"
            icon={Fingerprint}
            color="red"
            delay={800}
            desc="All expertise is guided by a strong ethical framework. Controlled, authorized, and responsible practices to ensure trust is never compromised."
            skills={['Ethical Hacking', 'Responsible Disclosure', 'Controlled Environments']}
          />

        </div>

        {/* --- FOOTER STATEMENT --- */}
        <div className="mt-32 mb-20 text-center animate-fade-in-up opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
           <Cpu className="w-12 h-12 text-white/20 mx-auto mb-6 animate-pulse" />
           <p className="text-2xl font-serif italic text-gray-400 mb-6">
             "To secure systems today that will still be trustworthy tomorrow."
           </p>
           <h3 className="text-4xl font-bold text-white tracking-widest uppercase">
             Shivansh Mishra
           </h3>
           <div className="mt-8 flex justify-center gap-4">
             <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
             <div className="h-1 w-20 bg-gradient-to-l from-purple-500 to-transparent rounded-full" />
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

export default Expertise;