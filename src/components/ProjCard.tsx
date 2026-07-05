import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

interface ProjCardProps {
  p: {
    num: string;
    icon: string;
    name: string;
    desc: string;
    tags: string[];
  };
  delay: number;
}

export default function ProjCard({ p, delay }: ProjCardProps) {
  const [ref, visible] = useReveal(0.1);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -10, y: px * 10, active: true });
  };
  const onLeave = () => setTilt({ x: 0, y: 0, active: false });

  return (
    <div ref={ref}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className="rounded-xl p-7 border relative overflow-hidden transition-colors duration-300 group"
      style={{
        background:"#111", borderColor:"rgba(229,62,62,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.active ? -4 : 0}px)`
          : "translateY(24px)",
        transition: tilt.active
          ? "transform 0.1s ease, box-shadow 0.1s ease"
          : `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease`,
        boxShadow: tilt.active
          ? `${-tilt.y * 2}px ${-tilt.x * 2}px 40px rgba(0,0,0,0.5), 0 0 24px rgba(229,62,62,0.06)`
          : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.5),transparent)" }} />
      <div className="text-xs mb-4 tracking-widest opacity-30"
        style={{ color:"#e53e3e", fontFamily:"'JetBrains Mono',monospace" }}>{p.num}</div>
      <div className="text-3xl mb-3">{p.icon}</div>
      <div className="text-base font-semibold text-white mb-2">{p.name}</div>
      <div className="text-sm mb-5 leading-relaxed" style={{ color:"#666" }}>{p.desc}</div>
      <div className="flex flex-wrap gap-1.5">
        {p.tags.map(t => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full border transition-colors duration-200"
            style={{ fontFamily:"'JetBrains Mono',monospace", color:"#e53e3e",
              background:"rgba(229,62,62,0.07)", borderColor:"rgba(229,62,62,0.15)" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}