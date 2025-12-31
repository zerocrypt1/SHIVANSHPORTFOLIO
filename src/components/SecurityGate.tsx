import React, { useState, useEffect, useRef, type FormEvent } from 'react';
import { Lock, Scroll, ShieldCheck, Sun, Hexagon, Sparkles, UserCircle } from 'lucide-react';

interface SecurityGateProps {
  onUnlock: () => void;
}

type Phase = 'auth' | 'battle' | 'victory';
type AuthMode = 'math' | 'vedic';

// --- DATA: VEDIC KNOWLEDGE BASE ---
const SHLOKAS = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।",
    english: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    keyword: "KARMA",
    hint: "Duty / Action"
  },
  {
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।",
    english: "Whenever there is a decline in righteousness, O Arjuna, at that time I manifest myself.",
    keyword: "DHARMA",
    hint: "Righteousness"
  },
  {
    sanskrit: "अहम् ब्रह्मास्मि ।",
    english: "I am the Absolute Reality (The Universe is within me).",
    keyword: "BRAHMAN",
    hint: "Ultimate Reality"
  },
  {
    sanskrit: "सत्यमेव जयते ।",
    english: "Truth alone triumphs, not falsehood.",
    keyword: "SATYA",
    hint: "Truth"
  }
];

const SecurityGate: React.FC<SecurityGateProps> = ({ onUnlock }) => {
  const [phase, setPhase] = useState<Phase>('auth');
  const [authMode, setAuthMode] = useState<AuthMode>('math');
  
  // -- Puzzle States --
  const [mathPuzzle, setMathPuzzle] = useState({ q: '', a: 0 });
  const [currentShloka, setCurrentShloka] = useState(SHLOKAS[0]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [bypassLoading, setBypassLoading] = useState(false);

  // -- Battle States --
  const [projectileStatus, setProjectileStatus] = useState<'idle' | 'flying' | 'impact'>('idle');
  const [enemyStatus, setEnemyStatus] = useState<'alive' | 'shattering' | 'dead'>('alive');

  const entanglementRef = useRef<HTMLCanvasElement>(null);

  // 1. Initialize Puzzles
  useEffect(() => {
    // Math Init
    const a = Math.floor(Math.random() * 15) + 5;
    const b = Math.floor(Math.random() * 10) + 2;
    const isAdd = Math.random() > 0.5;
    setMathPuzzle({
      q: `0x${a.toString(16).toUpperCase()} ${isAdd ? '+' : '-'} 0x${b.toString(16).toUpperCase()}`,
      a: isAdd ? a + b : a - b
    });

    // Vedic Init
    const random = SHLOKAS[Math.floor(Math.random() * SHLOKAS.length)];
    setCurrentShloka(random);
  }, []);

  // 2. Handle Inputs
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let isValid = false;

    if (authMode === 'math') {
      if (parseInt(input) === mathPuzzle.a) isValid = true;
    } else {
      if (input.toUpperCase().trim() === currentShloka.keyword) isValid = true;
    }

    if (isValid) {
      setPhase('battle');
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setInput('');
    }
  };

  // 3. Simple Access (Guest) - UPDATED: Now sends guest to Battle Phase
  const handleGuestAccess = () => {
    setBypassLoading(true);
    setTimeout(() => {
      setBypassLoading(false);
      setPhase('battle'); // Send guest to battle
    }, 800);
  };

  // 4. Battle Logic (Chakra vs Quantum Anomaly)
  const fireChakra = () => {
    if (projectileStatus !== 'idle') return;
    setProjectileStatus('flying');

    setTimeout(() => {
      setProjectileStatus('impact'); 
      setEnemyStatus('shattering');

      setTimeout(() => {
        setEnemyStatus('dead');
        setPhase('victory');
        setTimeout(() => {
           onUnlock();
        }, 3000); 
      }, 800); 
    }, 900);
  };

  // 5. Entanglement Canvas (Victory Animation)
  useEffect(() => {
    if (phase !== 'victory') return;
    const canvas = entanglementRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;
    let t = 0;
    let frameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, 300, 300);
      const cx = 150, cy = 150;
      
      for(let i=0; i<3; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 60 + i*10, 30 + i*5, t * (i%2===0?1:-1), 0, Math.PI*2);
        ctx.strokeStyle = `rgba(147, 51, 234, ${0.5 - i*0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const p1x = cx + Math.cos(t) * 50;
      const p1y = cy + Math.sin(t) * 50;
      const p2x = cx + Math.cos(t + Math.PI) * 50;
      const p2y = cy + Math.sin(t + Math.PI) * 50;

      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.strokeStyle = '#fcd34d'; 
      ctx.lineWidth = 2;
      ctx.stroke();

      [{x: p1x, y: p1y, c: '#ec4899'}, {x: p2x, y: p2y, c: '#3b82f6'}].forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI*2);
        ctx.fillStyle = p.c;
        ctx.fill();
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.c;
      });

      t += 0.05;
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      
      {/* --- AMAZING ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Moving Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(100, 100, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '50px 50px',
               animation: 'gridMove 20s linear infinite'
             }} 
        />
        {/* Pulsing Nebulas */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.4),transparent_70%)] animate-pulse" />
        <div className="absolute top-[-50%] left-[-20%] w-[100vw] h-[100vw] bg-purple-900/20 blur-[100px] rounded-full animate-spin-slow" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[100vw] h-[100vw] bg-blue-900/20 blur-[100px] rounded-full animate-spin-slow-reverse" />
      </div>

      {/* --- PHASE 1: AUTHENTICATION --- */}
      {phase === 'auth' && (
        <div className="w-full max-w-lg p-8 relative backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 animate-in fade-in zoom-in duration-500 z-10">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-widest mb-1">SECURITY GATEWAY</h2>
            <p className="text-xs text-gray-400 font-mono">SELECT AUTHENTICATION PROTOCOL</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-black/40 rounded-lg p-1 mb-6 border border-white/5">
            <button
              onClick={() => { setAuthMode('math'); setInput(''); }}
              className={`flex-1 py-2 text-xs font-bold font-mono rounded-md transition-all ${
                authMode === 'math' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3 inline mr-2" />
              QUANTUM HASH
            </button>
            <button
              onClick={() => { setAuthMode('vedic'); setInput(''); }}
              className={`flex-1 py-2 text-xs font-bold font-mono rounded-md transition-all ${
                authMode === 'vedic' ? 'bg-yellow-600 text-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Scroll className="w-3 h-3 inline mr-2" />
              VEDIC GATE
            </button>
          </div>

          {/* MATH MODE UI */}
          {authMode === 'math' && (
            <div className="text-center space-y-4 mb-6">
               <div className="bg-black/60 p-6 rounded border border-purple-500/30 text-green-400 font-mono text-2xl tracking-widest shadow-inner">
                  {mathPuzzle.q}
               </div>
            </div>
          )}

          {/* VEDIC MODE UI */}
          {authMode === 'vedic' && (
            <div className="text-center space-y-4 mb-6">
               <div className="space-y-2">
                 <p className="text-lg font-bold text-white font-serif leading-relaxed">
                   {currentShloka.sanskrit}
                 </p>
                 <p className="text-xs text-gray-300 italic">"{currentShloka.english}"</p>
               </div>
               <p className="text-[10px] text-yellow-500 font-mono">
                 TYPE ESSENCE (HINT: {currentShloka.hint})
               </p>
            </div>
          )}

          {/* INPUT FORM */}
          <form onSubmit={handleSubmit}>
            <input 
              type={authMode === 'math' ? "number" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={authMode === 'math' ? "Calculate Result" : "e.g. DHARMA"}
              autoFocus
              className={`w-full bg-black/50 text-center text-lg font-bold p-3 rounded-lg border focus:outline-none transition-all uppercase placeholder:text-gray-600 text-white ${
                authMode === 'math' ? 'border-purple-500/50 focus:border-purple-400' : 'border-yellow-500/50 focus:border-yellow-400'
              } ${error ? 'border-red-500 animate-shake' : ''}`}
            />
            <button className={`w-full mt-4 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg ${
               authMode === 'math' ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-yellow-600 hover:bg-yellow-500 text-black'
            }`}>
              <ShieldCheck className="w-4 h-4" /> AUTHENTICATE
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-gray-500">OR</span></div>
          </div>

          {/* SIMPLE ACCESS BUTTON */}
          <button 
            onClick={handleGuestAccess}
            disabled={bypassLoading}
            className="w-full py-3 rounded-lg border border-gray-600 hover:border-white hover:bg-white/5 text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2 group font-mono text-xs"
          >
            {bypassLoading ? (
               <Sparkles className="w-4 h-4 animate-spin text-green-400" />
            ) : (
               <UserCircle className="w-4 h-4 group-hover:text-green-400" />
            )}
            {bypassLoading ? "INITIALIZING BATTLE PROTOCOL..." : "GUEST ACCESS (JOIN BATTLE)"}
          </button>

        </div>
      )}

      {/* --- PHASE 2: BATTLE (CHAKRA VS QUANTUM ANOMALY) --- */}
      {phase === 'battle' && (
        <div className="relative w-full max-w-6xl h-[60vh] flex items-center justify-between px-4 md:px-20 z-10">
          
          {/* HERO: CHAKRA */}
          <div className="relative z-20 flex flex-col items-center group cursor-pointer" onClick={fireChakra}>
             <div className="relative w-24 h-24 md:w-32 md:h-32 animate-[spin_8s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite] transition-all duration-500">
               <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(234,179,8,0.8)]">
                  <defs>
                    <linearGradient id="chakraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                    <path key={deg} d="M50,10 L60,40 L40,40 Z" fill="url(#chakraGrad)" transform={`rotate(${deg} 50 50)`} />
                  ))}
                  <circle cx="50" cy="50" r="15" fill="#fff" />
                  <circle cx="50" cy="50" r="8" fill="#ea580c" />
               </svg>
             </div>
             <p className="mt-4 text-yellow-400 font-mono text-xs tracking-widest animate-pulse border border-yellow-500/30 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
               CLICK TO FIRE
             </p>

             {/* Flying Projectile */}
             {projectileStatus === 'flying' && (
                <div 
                   className="absolute top-1/2 left-1/2 w-16 h-16 md:w-20 md:h-20 text-yellow-200 z-50 pointer-events-none"
                   style={{
                     animation: 'flyAndGrow 0.9s ease-in forwards',
                     marginTop: '-2rem',
                     marginLeft: '-2rem'
                   }}
                >
                  <Sun className="w-full h-full animate-spin" />
                </div>
             )}
          </div>

          {/* VS LABEL */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <span className="text-6xl font-black text-white/10 italic select-none">VS</span>
          </div>

          {/* ENEMY: QUANTUM ANOMALY */}
          <div className="relative z-10 flex flex-col items-center">
             {enemyStatus !== 'dead' && (
               <div className={`relative transition-all duration-1000 ${enemyStatus === 'shattering' ? 'scale-150 opacity-0 filter brightness-200' : ''}`}>
                 
                 {/* Geometric Core */}
                 <div className="relative w-32 h-32 md:w-48 md:h-48">
                    <div className="absolute inset-0 border-4 border-red-500/50 animate-[spin_4s_linear_infinite]" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
                    <div className="absolute inset-2 border-2 border-purple-500/50 animate-[spin_6s_linear_infinite_reverse]" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
                    <div className="absolute inset-8 border border-white/80 animate-pulse rounded-full flex items-center justify-center bg-red-900/20 backdrop-blur-sm">
                       <Hexagon className="w-12 h-12 text-red-500 animate-spin" />
                    </div>
                 </div>

                 {/* Debris Explosion */}
                 {enemyStatus === 'shattering' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-full h-full bg-white rounded-full animate-ping"></div>
                       {[...Array(8)].map((_, i) => (
                         <div key={i} className="absolute w-2 h-2 bg-red-500 rounded-full"
                           style={{ transform: `rotate(${i * 45}deg) translate(80px)`, animation: `debris 0.5s ease-out forwards` }}
                         />
                       ))}
                    </div>
                 )}

                 {/* Health Bar */}
                 {enemyStatus === 'alive' && (
                   <>
                     <div className="mt-8 w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-red-600 w-full animate-pulse"></div>
                     </div>
                     <p className="text-red-500 font-mono text-xs mt-2 tracking-widest text-center bg-black/50 px-2 rounded">QUANTUM_THREAT</p>
                   </>
                 )}
               </div>
             )}
          </div>
        </div>
      )}

      {/* --- PHASE 3: VICTORY --- */}
      {phase === 'victory' && (
        <div className="flex flex-col items-center justify-center z-50 animate-in zoom-in duration-700 text-center">
          <div className="relative w-[300px] h-[300px] mb-8">
            <canvas ref={entanglementRef} className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-yellow-200 animate-pulse opacity-50" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            ENTANGLEMENT ESTABLISHED
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-lg tracking-[0.3em] uppercase">
            Access Granted
          </p>
        </div>
      )}

      {/* --- ANIMATIONS --- */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }
        
        @keyframes flyAndGrow {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(50vw, -10px) scale(1.5) rotate(360deg); }
          100% { transform: translate(calc(100vw - 200px), 0) scale(0) rotate(720deg); opacity: 0; }
        }
        @keyframes debris {
          0% { opacity: 1; transform: rotate(var(--rot)) translate(0); }
          100% { opacity: 0; transform: rotate(var(--rot)) translate(150px); }
        }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default SecurityGate;