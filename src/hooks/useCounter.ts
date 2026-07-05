import { useState, useEffect } from "react";

export function useCounter(target: number, decimal = false, trigger = false) {
  const [val, setVal] = useState<number | string>(0);
  useEffect(() => {
    if (!trigger) return;
    const dur = 1400, start = performance.now();
    function step(now: number) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(decimal ? (ease * target).toFixed(1) : Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [trigger]);
  return val;
}