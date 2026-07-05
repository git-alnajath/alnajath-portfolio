import { useReveal } from "../hooks/useReveal";

interface SkillGroupProps {
  group: {
    title: string;
    skills: (string | number)[][];
  };
  delay: number;
}

export default function SkillGroup({ group, delay }: SkillGroupProps) {
  const [ref, visible] = useReveal(0.25);
  return (
    <div ref={ref}
      className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1"
      style={{ background:"#111", borderColor:"rgba(229,62,62,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:`opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease` }}>
      <div className="text-xs mb-4 tracking-widest uppercase"
        style={{ color:"#e53e3e", fontFamily:"'JetBrains Mono',monospace" }}>{group.title}</div>
      <div className="flex flex-col gap-3">
        {group.skills.map(([name, w], i) => (
          <div key={String(name)} className="flex items-center justify-between">
            <span className="text-sm text-gray-200">{name}</span>
            <div className="w-20 h-0.5 rounded-full overflow-hidden" style={{ background:"#1a1a1a" }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: visible ? `${w}%` : "0%",
                  background:"linear-gradient(90deg,#7f1d1d,#e53e3e)",
                  transitionDelay:`${delay + i * 120}ms`
                }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}