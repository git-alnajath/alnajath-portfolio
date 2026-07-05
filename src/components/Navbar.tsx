import { useState } from "react";
import { NAV } from "../data/data";
import { useScrollTo } from "../hooks/useScrollTo";

interface NavbarProps {
  activeNav: string;
  scrolled: boolean;
}

export default function Navbar({ activeNav, scrolled }: NavbarProps) {
  const scrollTo = useScrollTo();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav id="navbar"
      className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-400"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(229,62,62,0.12)" : "none",
      }}>

      {/* Logo */}
      <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-bold tracking-wider cursor-pointer"
        style={{ fontFamily: "'JetBrains Mono',monospace", color: "#e53e3e", fontSize: 15 }}>
        AN<span style={{ color: "#333" }}>.</span>J
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8">
        {NAV.map(id => (
          <button key={id} onClick={() => scrollTo(id)}
            className="relative text-xs tracking-widest transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer group"
            style={{ fontFamily: "'JetBrains Mono',monospace", color: activeNav === id ? "#e53e3e" : "#555" }}>
            {id}
            <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 block"
              style={{ background: "#e53e3e", width: activeNav === id ? "100%" : "0%" }} />
          </button>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none outline-none p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu">
        <span className="block w-5 h-0.5 transition-all duration-300"
          style={{ background: "#e53e3e", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
        <span className="block w-5 h-0.5 transition-all duration-300"
          style={{ background: "#e53e3e", opacity: menuOpen ? 0 : 1 }} />
        <span className="block w-5 h-0.5 transition-all duration-300"
          style={{ background: "#e53e3e", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 flex flex-col items-center gap-6 py-8 md:hidden"
          style={{ background: "rgba(10,10,10,0.97)", borderBottom: "1px solid rgba(229,62,62,0.12)" }}>
          {NAV.map(id => (
            <button key={id}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
              className="text-sm tracking-widest bg-transparent border-none outline-none cursor-pointer transition-colors duration-200"
              style={{ fontFamily: "'JetBrains Mono',monospace", color: activeNav === id ? "#e53e3e" : "#555" }}>
              {id}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}