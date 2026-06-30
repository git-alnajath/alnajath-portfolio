import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────
const NAV = ["about","experience","projects","skills","contact"];

const ROLES = ["Frontend Developer","React.js Engineer","Next.js Developer","UI Architect","E-Commerce Builder"];

const NAME_PARTS = [
  { text: "Al", color: "text-white" },
  { text: " " },
  { text: "Najath", color: "text-red-500", glow: true },
  { text: " " },
  { text: "J", color: "text-white" },
];

const TECH = ["React.js","Next.js","TypeScript","Tailwind CSS","Redux","Axios","REST APIs"];

const STATS = [
  { num: 7, suffix: "+", label: "core modules delivered", count: true },
  { num: 1.5, suffix: "y", label: "production experience", count: true, decimal: true },
  { num: "MCA", label: "master's degree" },
  { num: "∞", label: "things to learn" },
];

const EXP = {
  role: "Software Engineer Trainee",
  company: "TetraDtech Solutions",
  date: "Nov 2024 – Present",
  loc: "Chennai, India",
  bullets: [
    "Led end-to-end frontend development of a production e-commerce application using React.js and Next.js with TypeScript.",
    "Delivered 7+ core modules — Product Listing, Product Detail, Shopping Cart, Wishlist, Order Management, Return & Exchange, and Profile Dashboard.",
    "Built responsive, mobile-first UIs with Tailwind CSS; integrated REST APIs via Axios with SSR and SSG for all data flows.",
    "Managed complex cross-module state using Redux and React Context covering cart, checkout, and order history.",
    "Collaborated in an Agile/Scrum team; assisted with PHP application coding, testing, and debugging.",
  ]
};

const PROJECTS = [
  { num:"01", icon:"🛒", name:"E-Commerce Platform", desc:"Full-featured multi-module e-commerce app built from scratch as sole frontend developer. SSR & SSG optimized with complete API integration.", tags:["Next.js","React.js","TypeScript","Tailwind","Redux"] },
  { num:"02", icon:"☁️", name:"Weather App", desc:"Responsive weather app with real-time city search, dynamic data fetching from OpenWeather API, and interactive UI.", tags:["React.js","OpenWeather API","Responsive"] },
  { num:"03", icon:"🍰", name:"Desserts — Mini E-Commerce", desc:"Product listing, cart management, and billing system with React hooks and functional components.", tags:["React.js","React Hooks","Custom CSS"] },
  { num:"04", icon:"🐦", name:"Bird Sound Classification", desc:"Academic ML model classifying bird species from audio recordings with feature extraction and accuracy testing.", tags:["Python","Machine Learning","Audio ML"] },
];

const SKILL_GROUPS = [
  { title:"Frontend", skills:[["React.js",90],["Next.js",85],["TypeScript",80],["Tailwind CSS",88]] },
  { title:"State & Data", skills:[["Redux",82],["React Context",85],["Axios / REST",88],["PostgreSQL",60]] },
  { title:"Languages", skills:[["JavaScript ES6+",90],["HTML5 / CSS3",92],["Python",65]] },
  { title:"Workflow & Tools", skills:[["Git / GitHub",85],["Agile / Scrum",78],["SSR / SSG",83],["Claude AI",80]] },
];

const CONTACT_LINKS = [
  { icon:"✉️", label:"alnajath1@gmail.com", href:"mailto:alnajath1@gmail.com" },
  { icon:"💼", label:"linkedin.com/in/alnajath", href:"https://linkedin.com" },
  { icon:"🐙", label:"github.com/alnajath", href:"https://github.com" },
];

// ── HOOK: scroll to section ───────────────────────────────────────────
function useScrollTo() {
  return (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById("navbar");
    const offset = nav ? nav.offsetHeight + 8 : 72;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };
}

// ── HOOK: intersection observer ───────────────────────────────────────
function useReveal(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── HOOK: counter animation ───────────────────────────────────────────
function useCounter(target: number, decimal = false, trigger = false) {
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

// ── CANVAS: blueprint grid ────────────────────────────────────────────
function GridCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
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

    const hero = document.getElementById("hero");
    const onMove = (e) => {
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

// ── NAME reveal ───────────────────────────────────────────────────────
function HeroName() {
  const [shown, setShown] = useState([]);
  const chars = [];
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

// ── TYPEWRITER ────────────────────────────────────────────────────────
function Typewriter() {
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = ROLES[idx];
    function tick() {
      if (!deleting) {
        setText(p => { const next = current.slice(0, p.length + 1); return next; });
        if (text.length + 1 === current.length) { timeoutRef.current = setTimeout(() => setDeleting(true), 2000); return; }
        timeoutRef.current = setTimeout(tick, 72);
      } else {
        setText(p => p.slice(0, -1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx(i => (i + 1) % ROLES.length); timeoutRef.current = setTimeout(tick, 350); return; }
        timeoutRef.current = setTimeout(tick, 38);
      }
    }
    timeoutRef.current = setTimeout(tick, 80);
    return () => clearTimeout(timeoutRef.current);
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

// ── STAT CARD ─────────────────────────────────────────────────────────
function StatCard({ stat, delay }) {
  const [ref, visible] = useReveal(0.4);
  const val = useCounter(stat.num, stat.decimal, stat.count && visible);

  return (
    <div ref={ref}
      className="rounded-lg p-6 border relative overflow-hidden transition-all duration-300 group"
      style={{ background:"#111", borderColor:"rgba(229,62,62,0.15)",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:`opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease` }}>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-400" style={{ background:"#e53e3e" }} />
      <div className="text-4xl font-black" style={{ color:"#e53e3e", fontFamily:"'Syne',sans-serif" }}>
        {stat.count ? `${val}${stat.suffix}` : stat.num}
      </div>
      <div className="text-xs mt-1.5 tracking-wider" style={{ color:"#555", fontFamily:"'JetBrains Mono',monospace" }}>{stat.label}</div>
    </div>
  );
}

// ── PROJ CARD ─────────────────────────────────────────────────────────
function ProjCard({ p, delay }) {
  const [ref, visible] = useReveal(0.1);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const onMove = (e) => {
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
        opacity: visible ? 1 : 0, transform: visible ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.active ? -4 : 0}px)` : "translateY(24px)",
        transition: tilt.active ? "transform 0.1s ease, box-shadow 0.1s ease" : `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease`,
        boxShadow: tilt.active ? `${-tilt.y * 2}px ${-tilt.x * 2}px 40px rgba(0,0,0,0.5), 0 0 24px rgba(229,62,62,0.06)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.5),transparent)" }} />
      <div className="text-xs mb-4 tracking-widest opacity-30" style={{ color:"#e53e3e", fontFamily:"'JetBrains Mono',monospace" }}>{p.num}</div>
      <div className="text-3xl mb-3">{p.icon}</div>
      <div className="text-base font-semibold text-white mb-2">{p.name}</div>
      <div className="text-sm mb-5 leading-relaxed" style={{ color:"#666" }}>{p.desc}</div>
      <div className="flex flex-wrap gap-1.5">
        {p.tags.map(t => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full border transition-colors duration-200"
            style={{ fontFamily:"'JetBrains Mono',monospace", color:"#e53e3e", background:"rgba(229,62,62,0.07)", borderColor:"rgba(229,62,62,0.15)" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── SKILL GROUP ───────────────────────────────────────────────────────
function SkillGroup({ group, delay }) {
  const [ref, visible] = useReveal(0.25);
  return (
    <div ref={ref}
      className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1"
      style={{ background:"#111", borderColor:"rgba(229,62,62,0.15)",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:`opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease` }}>
      <div className="text-xs mb-4 tracking-widest uppercase" style={{ color:"#e53e3e", fontFamily:"'JetBrains Mono',monospace" }}>{group.title}</div>
      <div className="flex flex-col gap-3">
        {group.skills.map(([name, w], i) => (
          <div key={name} className="flex items-center justify-between">
            <span className="text-sm text-gray-200">{name}</span>
            <div className="w-20 h-0.5 rounded-full overflow-hidden" style={{ background:"#1a1a1a" }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: visible ? `${w}%` : "0%", background:"linear-gradient(90deg,#7f1d1d,#e53e3e)", transitionDelay:`${delay + i * 120}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SECTION WRAPPER ───────────────────────────────────────────────────
function Section({ id, num, title, children }) {
  const [ref, visible] = useReveal(0.1);
  const [titleRef, titleVisible] = useReveal(0.4);
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 md:px-12 py-24">
      <div ref={ref}
        className="text-xs mb-3 tracking-widest uppercase transition-all duration-500"
        style={{ fontFamily:"'JetBrains Mono',monospace", color:"#e53e3e",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}>
        {num} / {id}
      </div>
      <div ref={titleRef} className="relative inline-block mb-14">
        <h2 className="font-black tracking-tight text-white" style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,44px)" }}>{title}</h2>
        <div className="absolute -bottom-2.5 left-0 h-0.5 transition-all duration-900 ease-out"
          style={{ background:"linear-gradient(90deg,#e53e3e,transparent)", width: titleVisible ? "100%" : "0%" }} />
      </div>
      {children}
    </section>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────
export default function Portfolio() {
  const scrollTo = useScrollTo();
  const [activeNav, setActiveNav] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  // Cursor
  useEffect(() => {
    const onMove = (e) => { targetRef.current = { x: e.clientX, y: e.clientY }; setCursor({ x: e.clientX, y: e.clientY }); };
    document.addEventListener("mousemove", onMove);
    let raf;
    function animRing() {
      ringRef.current.x += (targetRef.current.x - ringRef.current.x) * 0.1;
      ringRef.current.y += (targetRef.current.y - ringRef.current.y) * 0.1;
      setRing({ ...ringRef.current });
      raf = requestAnimationFrame(animRing);
    }
    animRing();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(s / h * 100);
      setScrolled(s > 40);
      const nav = document.getElementById("navbar");
      const offset = nav ? nav.offsetHeight + 80 : 80;
      let cur = "hero";
      ["hero", ...NAV].forEach(id => {
        const el = document.getElementById(id);
        if (el && s >= el.offsetTop - offset) cur = id;
      });
      setActiveNav(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background:"#0a0a0a", minHeight:"100vh", color:"#f0f0f0", fontFamily:"'Inter',sans-serif", cursor:"none" }}>

      {/* Custom cursor */}
      <div className="fixed pointer-events-none z-50 rounded-full"
        style={{ width:8, height:8, background:"#e53e3e", top:cursor.y, left:cursor.x, transform:"translate(-50%,-50%)", mixBlendMode:"screen" }} />
      <div className="fixed pointer-events-none z-40 rounded-full border transition-all duration-300"
        style={{ width:32, height:32, top:ring.y, left:ring.x, transform:"translate(-50%,-50%)", borderColor:"rgba(229,62,62,0.45)", mixBlendMode:"screen" }} />

      {/* Progress */}
      <div className="fixed top-0 left-0 h-0.5 z-50 transition-none"
        style={{ width:`${progress}%`, background:"linear-gradient(90deg,#7f1d1d,#e53e3e,#fc8181)" }} />

      {/* NAV */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-400"
        style={{ background: scrolled ? "rgba(10,10,10,0.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(229,62,62,0.12)" : "none" }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior:"smooth" })}
          className="font-bold tracking-wider cursor-pointer"
          style={{ fontFamily:"'JetBrains Mono',monospace", color:"#e53e3e", fontSize:15 }}>
          AN<span style={{ color:"#333" }}>.</span>J
        </div>
        <div className="flex gap-6 md:gap-8">
          {NAV.map(id => (
            <button key={id} onClick={() => scrollTo(id)}
              className="relative text-xs tracking-widest transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer group"
              style={{ fontFamily:"'JetBrains Mono',monospace", color: activeNav === id ? "#e53e3e" : "#555" }}>
              {id}
              <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 block"
                style={{ background:"#e53e3e", width: activeNav === id ? "100%" : "0%" }} />
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div id="hero" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
        style={{ padding:"120px 24px 100px" }}>
        <GridCanvas />
        <div className="absolute pointer-events-none rounded-full z-10"
          style={{ width:700, height:700, background:"radial-gradient(circle,rgba(229,62,62,0.07) 0%,transparent 65%)", transform:"translate(-50%,-50%)", top:"50%", left:"50%" }} />

        <div className="relative z-20 flex flex-col items-center w-full max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase rounded-full px-5 py-1.5 mb-12 border"
            style={{ fontFamily:"'JetBrains Mono',monospace", color:"#68d391", borderColor:"rgba(104,211,145,0.2)", background:"rgba(104,211,145,0.03)",
              animation:"cinIn 0.7s 0.2s ease both" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:"#68d391", boxShadow:"0 0 8px #68d391", animation:"gpulse 2s ease infinite" }} />
            Open to opportunities
          </div>

          <HeroName />
          <Typewriter />

          <p className="text-sm md:text-base leading-loose mb-11 max-w-md" style={{ color:"#555" }}>
            Frontend developer specializing in React.js &amp; Next.js — crafting production-grade e-commerce experiences with TypeScript, Tailwind CSS, and Redux.
          </p>

          <div className="flex gap-4 flex-wrap justify-center mb-12">
            <button onClick={() => scrollTo("projects")}
              className="px-9 py-3 font-bold text-xs tracking-widest rounded-sm relative overflow-hidden transition-all duration-250 hover:-translate-y-0.5 cursor-pointer"
              style={{ fontFamily:"'JetBrains Mono',monospace", background:"#e53e3e", color:"#fff", border:"1px solid #e53e3e",
                boxShadow:"none" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow="0 12px 36px rgba(229,62,62,0.4)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow="none"}>
              View Projects
            </button>
            <button onClick={() => scrollTo("contact")}
              className="px-9 py-3 font-bold text-xs tracking-widest rounded-sm relative overflow-hidden transition-all duration-250 hover:-translate-y-0.5 cursor-pointer"
              style={{ fontFamily:"'JetBrains Mono',monospace", background:"transparent", color:"#e53e3e", border:"1px solid rgba(229,62,62,0.35)" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(229,62,62,0.1)"; e.currentTarget.style.borderColor="#e53e3e"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(229,62,62,0.35)"; }}>
              Get in Touch
            </button>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {TECH.map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-sm border transition-all duration-200 hover:-translate-y-0.5"
                style={{ fontFamily:"'JetBrains Mono',monospace", color:"#444", borderColor:"rgba(229,62,62,0.1)", background:"rgba(229,62,62,0.02)",
                  cursor:"none" }}
                onMouseEnter={e => { e.currentTarget.style.color="#e53e3e"; e.currentTarget.style.borderColor="rgba(229,62,62,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#444"; e.currentTarget.style.borderColor="rgba(229,62,62,0.1)"; }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ animation:"cinIn 0.6s 2.6s ease both" }}>
          <div className="rounded-full flex justify-center pt-1.5" style={{ width:18, height:28, border:"1px solid #222" }}>
            <div className="rounded-full" style={{ width:2, height:5, background:"#e53e3e", animation:"sdrop 1.8s ease infinite" }} />
          </div>
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily:"'JetBrains Mono',monospace", color:"#333", fontSize:9 }}>scroll</span>
        </div>
      </div>

      <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.1),transparent)" }} />

      {/* ABOUT */}
      <Section id="about" num="01" title="Who I am">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="text-sm leading-loose space-y-4" style={{ color:"#555" }}>
            <p>I'm a <strong className="text-gray-200">Frontend Developer</strong> working as a Software Engineer Trainee at <strong className="text-gray-200">TetraDtech Solutions</strong> in Chennai. I hold a Master's in Computer Applications from B.S. Abdur Rahman Crescent Institute.</p>
            <p>I independently own the frontend architecture of a production-grade e-commerce platform — from UI design and REST API integration to Redux state management and responsive layouts.</p>
            <p>I love solving real-world problems through clean, performant code. When I'm not building UIs, I'm studying how platforms like <strong className="text-gray-200">Flipkart, Amazon, and Myntra</strong> architect their frontends.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s, i) => <StatCard key={i} stat={s} delay={i * 100} />)}
          </div>
        </div>
      </Section>

      <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.1),transparent)" }} />

      {/* EXPERIENCE */}
      <Section id="experience" num="02" title="Where I've worked">
        <div className="grid md:grid-cols-[180px_1fr] gap-10">
          <div className="md:text-right pt-1">
            <div className="text-xs tracking-wider" style={{ fontFamily:"'JetBrains Mono',monospace", color:"#e53e3e" }}>{EXP.date}</div>
            <div className="text-sm mt-1.5" style={{ color:"#555" }}>{EXP.company}</div>
          </div>
          <div className="relative pl-9" style={{ borderLeft:"1px solid rgba(229,62,62,0.2)" }}>
            <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full" style={{ background:"#e53e3e", boxShadow:"0 0 12px #e53e3e" }} />
            <div className="text-lg font-semibold text-white mb-1">{EXP.role}</div>
            <div className="text-xs mb-5" style={{ fontFamily:"'JetBrains Mono',monospace", color:"#555" }}>📍 {EXP.loc}</div>
            <ul className="flex flex-col gap-3">
              {EXP.bullets.map((b, i) => (
                <li key={i} className="text-sm pl-5 relative leading-relaxed transition-colors duration-200 group" style={{ color:"#555" }}>
                  <span className="absolute left-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color:"#e53e3e" }}>▸</span>
                  <span className="group-hover:text-gray-200 transition-colors duration-200">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.1),transparent)" }} />

      {/* PROJECTS */}
      <Section id="projects" num="03" title="Things I've built">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => <ProjCard key={p.num} p={p} delay={i * 100} />)}
        </div>
      </Section>

      <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.1),transparent)" }} />

      {/* SKILLS */}
      <Section id="skills" num="04" title="What I work with">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((g, i) => <SkillGroup key={g.title} group={g} delay={i * 100} />)}
        </div>
      </Section>

      <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(229,62,62,0.1),transparent)" }} />

      {/* CONTACT */}
      <Section id="contact" num="05" title="Let's connect">
        <div className="rounded-xl p-8 md:p-16 border grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative overflow-hidden"
          style={{ background:"#111", borderColor:"rgba(229,62,62,0.15)" }}>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
            style={{ background:"radial-gradient(circle,rgba(229,62,62,0.05),transparent 70%)" }} />
          <div>
            <p className="text-sm leading-loose mb-7" style={{ color:"#555" }}>
              I'm open to frontend developer roles, freelance projects, and collaborations. Whether it's a full-scale e-commerce platform or a side project — let's talk.
            </p>
            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map(l => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined}
                  className="flex items-center gap-3 py-2 transition-all duration-250 group"
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"#555", textDecoration:"none", cursor:"none" }}
                  onMouseEnter={e => e.currentTarget.style.color="#e53e3e"}
                  onMouseLeave={e => e.currentTarget.style.color="#555"}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0 border transition-all duration-250 group-hover:border-red-500"
                    style={{ background:"#181818", borderColor:"rgba(229,62,62,0.15)" }}>
                    {l.icon}
                  </div>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {[["Location","Chennai, India 📍"],["Phone","+91 8056353551"],["Status","🟢 Open to opportunities"],["Nationality","Indian 🇮🇳"]].map(([label, val]) => (
              <div key={label} className="pb-5 border-b last:border-0 last:pb-0" style={{ borderColor:"rgba(255,255,255,0.04)" }}>
                <div className="text-xs mb-1.5 tracking-widest uppercase" style={{ fontFamily:"'JetBrains Mono',monospace", color:"#444" }}>{label}</div>
                <div className="text-sm text-gray-200">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <footer className="text-center py-9 border-t" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#333", borderColor:"rgba(229,62,62,0.08)" }}>
        Crafted with ❤️ by <span style={{ color:"#e53e3e" }}>Al Najath J</span> — Frontend Developer, Chennai
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes cinIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes gpulse { 0%,100% { box-shadow:0 0 8px #68d391; } 50% { box-shadow:0 0 20px #68d391; } }
        @keyframes sdrop { 0% { transform:translateY(0); opacity:1; } 75% { opacity:0; } 100% { transform:translateY(10px); opacity:0; } }
        * { cursor: none !important; }
        button { cursor: none !important; }
        a { cursor: none !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #e53e3e; border-radius: 2px; }
        @media (max-width: 768px) { * { cursor: auto !important; } }
      `}</style>
    </div>
  );
}
