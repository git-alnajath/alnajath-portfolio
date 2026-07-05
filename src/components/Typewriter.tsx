import { useState, useEffect, useRef } from "react";
import { ROLES } from "../data/data";

export default function Typewriter() {
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[idx];
    function tick() {
      if (!deleting) {
        setText(p => current.slice(0, p.length + 1));
        if (text.length + 1 === current.length) {
          timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
          return;
        }
        timeoutRef.current = setTimeout(tick, 72);
      } else {
        setText(p => p.slice(0, -1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIdx(i => (i + 1) % ROLES.length);
          timeoutRef.current = setTimeout(tick, 350);
          return;
        }
        timeoutRef.current = setTimeout(tick, 38);
      }
    }
    timeoutRef.current = setTimeout(tick, 80);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [text, deleting, idx]);

  return (
    <div className="flex items-center justify-center gap-3 mt-7 mb-8">
      <div className="w-12 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.4))" }} />
      <div className="flex items-center gap-2" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(12px,1.8vw,16px)" }}>
        <span className="text-red-500 opacity-50">//</span>
        <span className="text-red-300 min-w-[180px] text-left">{text}</span>
        <span className="inline-block w-0.5 bg-red-500 animate-pulse" style={{ height:"1em", verticalAlign:"middle" }} />
      </div>
      <div className="w-12 h-px" style={{ background:"linear-gradient(90deg,rgba(229,62,62,0.4),transparent)" }} />
    </div>
  );
}