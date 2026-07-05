import { useState, useEffect, useRef } from "react";
import { NAV, STATS, EXP, PROJECTS, SKILL_GROUPS, CONTACT_LINKS, TECH } from "./data/data";
import GridCanvas from "./components/GridCanvas";
import HeroName from "./components/HeroName";
import Typewriter from "./components/Typewriter";
import StatCard from "./components/StatCard";
import ProjCard from "./components/ProjCard";
import SkillGroup from "./components/SkillGroup";
import Section from "./components/Section";
import { useScrollTo } from "./hooks/useScrollTo";

export default function App() {
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
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setCursor({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    function animRing() {
      ringRef.current.x += (targetRef.current.x - ringRef.current.x) * 0.1;
      ringRef.current.y += (targetRef.current.y - ringRef.current.y) * 0.1;
      setRing({ ...ringRef.current });
      raf = requestAnimationFrame(animRing);
    }
    animRing();
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
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
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase rounded-full px-5 py-1.5 mb-12 border"
            style={{ fontFamily:"'JetBrains Mono',monospace", color:"#68d391", borderColor:"rgba(104,211,145,0.2)", background:"rgba(104,211,145,0.03)", animation:"cinIn 0.7s 0.2s ease both" }}>
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
              style={{ fontFamily:"'JetBrains Mono',monospace", background:"#e53e3e", color:"#fff", border:"1px solid #e53e3e", boxShadow:"none" }}
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
                style={{ fontFamily:"'JetBrains Mono',monospace", color:"#444", borderColor:"rgba(229,62,62,0.1)", background:"rgba(229,62,62,0.02)", cursor:"none" }}
                onMouseEnter={e => { e.currentTarget.style.color="#e53e3e"; e.currentTarget.style.borderColor="rgba(229,62,62,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#444"; e.currentTarget.style.borderColor="rgba(229,62,62,0.1)"; }}>
                {t}
              </span>
            ))}
          </div>
        </div>

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