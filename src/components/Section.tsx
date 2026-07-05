import { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface SectionProps {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, num, title, children }: SectionProps) {
  const [ref, visible] = useReveal(0.1);
  const [titleRef, titleVisible] = useReveal(0.4);
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 md:px-12 py-24">
      <div ref={ref}
        className="text-xs mb-3 tracking-widest uppercase transition-all duration-500"
        style={{ fontFamily:"'JetBrains Mono',monospace", color:"#e53e3e",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)" }}>
        {num} / {id}
      </div>
      <div ref={titleRef} className="relative inline-block mb-14">
        <h2 className="font-black tracking-tight text-white"
          style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,44px)" }}>{title}</h2>
        <div className="absolute -bottom-2.5 left-0 h-0.5 transition-all duration-900 ease-out"
          style={{ background:"linear-gradient(90deg,#e53e3e,transparent)",
            width: titleVisible ? "100%" : "0%" }} />
      </div>
      {children}
    </section>
  );
}