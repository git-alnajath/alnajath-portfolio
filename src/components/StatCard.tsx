import { useReveal } from "../hooks/useReveal";
import { useCounter } from "../hooks/useCounter";

interface StatCardProps {
  stat: {
    num: number | string;
    suffix?: string;
    label: string;
    count?: boolean;
    decimal?: boolean;
  };
  delay: number;
}

export default function StatCard({ stat, delay }: StatCardProps) {
  const [ref, visible] = useReveal(0.4);
  const val = useCounter(
    typeof stat.num === "number" ? stat.num : 0,
    stat.decimal,
    stat.count && visible
  );

  return (
    <div ref={ref}
      className="rounded-lg p-6 border relative overflow-hidden transition-all duration-300 group"
      style={{ background:"#111", borderColor:"rgba(229,62,62,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:`opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease` }}>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-400"
        style={{ background:"#e53e3e" }} />
      <div className="text-4xl font-black" style={{ color:"#e53e3e", fontFamily:"'Syne',sans-serif" }}>
        {stat.count ? `${val}${stat.suffix}` : stat.num}
      </div>
      <div className="text-xs mt-1.5 tracking-wider"
        style={{ color:"#555", fontFamily:"'JetBrains Mono',monospace" }}>
        {stat.label}
      </div>
    </div>
  );
}