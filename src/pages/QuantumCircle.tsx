import React, { useEffect, useRef } from 'react';

// Added props to make the colors dynamic based on the theme
interface QuantumCircleProps {
  primary?: string;   // e.g. "139, 92, 246"
  secondary?: string; // e.g. "236, 72, 153"
}

const QuantumCircle: React.FC<QuantumCircleProps> = ({ 
  primary = "139, 92, 246", 
  secondary = "236, 72, 153" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const radius = 120;

      /* ---- OUTER QUANTUM RINGS ---- */
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius + i * 30, 0, Math.PI * 2);
        // Use dynamic primary color
        ctx.strokeStyle = `rgba(${primary}, ${0.3 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      /* ---- ORBITING PARTICLES ---- */
      for (let i = 0; i < 8; i++) {
        const angle = phase + (i * Math.PI) / 4;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        // Use dynamic secondary color
        ctx.fillStyle = `rgba(${secondary}, ${
          0.8 + Math.sin(phase * 2 + i) * 0.2
        })`;
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${primary}, 0.2)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* ---- CORE PULSE ---- */
      const pulse = 25 + Math.sin(phase * 2) * 5;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse);
      // Use dynamic colors for gradient
      gradient.addColorStop(0, `rgba(${secondary}, 0.8)`);
      gradient.addColorStop(0.5, `rgba(${primary}, 0.6)`);
      gradient.addColorStop(1, `rgba(${primary}, 0)`);

      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      /* ---- ROTATING TRIANGLE (SUPERPOSITION) ---- */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(phase);
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3;
        const x = Math.cos(a) * 40;
        const y = Math.sin(a) * 40;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${secondary}, 0.8)`;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      phase += 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [primary, secondary]); // Re-run if colors change

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto transition-all duration-1000">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-6xl animate-pulse opacity-50 grayscale">⚛️</div>
      </div>
    </div>
  );
};

export default QuantumCircle;