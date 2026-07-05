import { useEffect, useRef } from "react";

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const CELL = 50;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my, active } = mouse.current;

      ctx.strokeStyle = "rgba(229,62,62,0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y <= H; y += CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      for (let x = 0; x <= W; x += CELL) {
        for (let y = 0; y <= H; y += CELL) {
          const d = active ? Math.hypot(x - mx, y - my) : 9999;
          const g = Math.max(0, 1 - d / 180);
          ctx.beginPath();
          ctx.arc(x, y, g > 0.01 ? 1.5 + g * 3 : 1, 0, Math.PI * 2);
          ctx.fillStyle = g > 0.01 ? `rgba(229,62,62,${0.1 + g * 0.7})` : "rgba(229,62,62,0.08)";
          ctx.fill();
        }
      }

      if (active) {
        const nx = Math.round(mx / CELL) * CELL, ny = Math.round(my / CELL) * CELL;
        ctx.strokeStyle = "rgba(229,62,62,0.18)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(nx, 0); ctx.lineTo(nx, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, ny); ctx.lineTo(W, ny); ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    const hero = document.getElementById("hero")!;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { mouse.current.active = false; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}