import { useState, useEffect } from "react";
import { NAME_PARTS } from "../data/data";

export default function HeroName() {
  const [shown, setShown] = useState<number[]>([]);
  const chars: { ch: string; color?: string; glow?: boolean; space?: boolean }[] = [];

  NAME_PARTS.forEach((part) => {
    if (part.text === " ") { chars.push({ ch: "\u00a0", space: true }); return; }
    [...part.text].forEach(ch => chars.push({ ch, color: part.color, glow: part.glow }));
  });

  useEffect(() => {
    chars.forEach((_, i) => {
      setTimeout(() => setShown(p => [...p, i]), 300 + i * 60);
    });
  }, []);

  return (
    <h1 className="font-black leading-none tracking-tighter whitespace-nowrap"
        style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(32px,10vw,118px)" }}>
      {chars.map((c, i) => (
        <span key={i}
          className={`inline-block transition-all duration-500 ${c.color || ""}`}
          style={{
            opacity: shown.includes(i) ? 1 : 0,
            transform: shown.includes(i) ? "translateY(0) rotateX(0deg)" : "translateY(50px) rotateX(-30deg)",
            textShadow: c.glow ? "0 0 40px rgba(229,62,62,0.45)" : "none",
            width: c.space ? "0.28em" : undefined,
            transitionDelay: `${i * 20}ms`,
          }}
        >{c.ch}</span>
      ))}
    </h1>
  );
}