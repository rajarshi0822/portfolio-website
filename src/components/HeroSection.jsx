import { useEffect, useRef, useState } from "react";
import ParallaxElements from "./ParallaxElements";

const ROLES = [
  "Full Stack Developer",
  "Open Source Contributor",
  "UI/UX Enthusiast",
  "Problem Solver",
  "AI/ML Enthusiast",
];

/* Typewriter hook */
const useTypewriter = (words) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = words[wordIdx];
    let i = typing ? 0 : word.length;
    const id = setInterval(() => {
      if (typing) {
        setDisplayed(word.slice(0, i + 1)); i++;
        if (i > word.length) { clearInterval(id); setTimeout(() => setTyping(false), 2000); }
      } else {
        setDisplayed(word.slice(0, i - 1)); i--;
        if (i < 0) { clearInterval(id); setTyping(true); setWordIdx(p => (p + 1) % words.length); }
      }
    }, typing ? 65 : 35);
    return () => clearInterval(id);
  }, [wordIdx, typing]);

  return displayed;
};

const HeroSection = ({ profile }) => {
  const role = useTypewriter(ROLES);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      id="hero"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 1.5rem",
      }}
    >
      {/* ── Ironhill hero background image ── */}
      <img
        src="/hero-bg.webp"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      {/* ── Ironhill Parallax Twigs ── */}
      <ParallaxElements />
      {/* ── Radial vignette overlay — stronger for readability ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 55% at 50% 50%, transparent 20%, rgba(9,14,9,0.7) 100%),
          radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(9,14,9,0.5) 100%)
        `,
      }} />

      {/* ── Content ── */}
      <div style={{
        position: "relative", zIndex: 3,
        textAlign: "center",
        maxWidth: 720,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Available badge */}
        <div style={{
          ...fadeUp(0.1), display: "inline-flex", alignItems: "center", gap: 7,
          padding: "6px 18px", borderRadius: 999, marginBottom: "1.8rem",
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.25)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: "#10b981",
            boxShadow: "0 0 8px #10b981", display: "inline-block",
            animation: "pulseGreen 2s ease-in-out infinite"
          }} />
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.62rem",
            color: "#10b981", letterSpacing: "0.12em"
          }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Avatar */}
        <div style={{ ...fadeUp(0.2), marginBottom: "1.6rem" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Spinning ring */}
            <div style={{
              position: "absolute", inset: -4, borderRadius: "50%",
              background: "conic-gradient(from 0deg, #10b981, #84cc16, #eab308, #10b981)",
              animation: "spinRing 4s linear infinite",
            }} />
            <img
              src={profile?.avatar_url || `https://github.com/rajarshi0822.png`}
              alt="Rajarshi"
              style={{
                width: 110, height: 110, borderRadius: "50%", objectFit: "cover",
                border: "4px solid #090e09", position: "relative", zIndex: 1, display: "block",
              }}
            />
            <div style={{
              position: "absolute", bottom: 5, right: 5, width: 14, height: 14,
              borderRadius: "50%", background: "#10b981", border: "2px solid #090e09",
              zIndex: 2, boxShadow: "0 0 8px rgba(16,185,129,0.8)",
            }} />
          </div>
        </div>

        {/* Name */}
        <h1 style={{
          ...fadeUp(0.3),
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem, 8vw, 5.5rem)", lineHeight: 1.05,
          marginBottom: "0.6rem", letterSpacing: "-0.03em",
          textShadow: "0 4px 30px rgba(9,14,9,0.8)",
        }}>
          <span style={{
            background: "linear-gradient(135deg, #10b981 0%, #84cc16 50%, #eab308 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", backgroundSize: "200%",
            animation: "shimmer 4s linear infinite",
            filter: "drop-shadow(0 2px 12px rgba(16,185,129,0.3))",
          }}>Rajarshi</span>{" "}
          <span style={{ color: "#ecfdf5", textShadow: "0 2px 20px rgba(9,14,9,0.9)" }}>Lakshman</span>
        </h1>

        {/* Role badge */}
        <p style={{
          ...fadeUp(0.4),
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(0.68rem, 2vw, 0.85rem)",
          color: "#10b981", letterSpacing: "0.14em",
          textTransform: "uppercase", marginBottom: "1rem",
          textShadow: "0 2px 10px rgba(9,14,9,0.8)",
        }}>
          Creative Developer &amp; Open Source Enthusiast
        </p>

        {/* Typewriter */}
        <div style={{
          ...fadeUp(0.45),
          display: "flex", alignItems: "center", gap: 8,
          justifyContent: "center", marginBottom: "1.2rem",
        }}>
          <span style={{ width: 3, height: 22, background: "linear-gradient(#10b981,#84cc16)", borderRadius: 2, flexShrink: 0 }} />
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.75rem, 1.8vw, 1rem)", color: "#a7f3d0",
            textShadow: "0 2px 10px rgba(9,14,9,0.8)",
          }}>
            {role}<span style={{ color: "#10b981", animation: "blink 1s step-end infinite" }}>|</span>
          </span>
        </div>

        {/* Description */}
        <p style={{
          ...fadeUp(0.5),
          color: "#a3b8a3", fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
          lineHeight: 1.8, maxWidth: 520, marginBottom: "2.4rem",
          textShadow: "0 2px 12px rgba(9,14,9,0.8)",
        }}>
          I craft immersive digital experiences with modern web technologies,
          blending design and code into something meaningful.
        </p>

        {/* CTA Buttons */}
        <div style={{
          ...fadeUp(0.6),
          display: "flex", gap: "1rem", justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <a href="#projects" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0.85rem 2.2rem", borderRadius: 14, textDecoration: "none",
            background: "linear-gradient(135deg, #10b981, #84cc16)",
            color: "#fff", fontWeight: 700, fontSize: "0.88rem",
            letterSpacing: "0.02em",
            boxShadow: "0 6px 28px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.15)",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(16,185,129,0.55), 0 0 60px rgba(16,185,129,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.15)"; }}
          >
            View My Work
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </a>

          <a href="#contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0.85rem 2.2rem", borderRadius: 14, textDecoration: "none",
            background: "rgba(255,255,255,0.04)",
            color: "#c9b8ff", fontSize: "0.88rem",
            border: "1px solid rgba(16,185,129,0.25)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.12)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Get in Touch
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 4L3 11l7 4 4 7 6-18z" /></svg>
          </a>
        </div>

        {/* Stats strip */}
        {profile && (
          <div style={{
            ...fadeUp(0.7),
            display: "flex", gap: "3rem", justifyContent: "center",
            marginTop: "2.8rem", flexWrap: "wrap",
          }}>
            {[
              { val: profile.public_repos, label: "Repos" },
              { val: profile.followers, label: "Followers" },
              { val: profile.following, label: "Following" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", fontWeight: 700, color: "#10b981", lineHeight: 1,
                  textShadow: "0 0 20px rgba(16,185,129,0.4)",
                }}>{val}</div>
                <div style={{ fontSize: "0.6rem", color: "#6b6b8a", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%",
        transform: "translateX(-50%)", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center",
        animation: "floatAnim 2.5s ease-in-out infinite",
      }}>
        <div style={{
          padding: "8px", borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(16,185,129,0.2)",
          backdropFilter: "blur(10px)",
        }}>
          <svg width="14" height="14" fill="none" stroke="rgba(180,170,230,0.6)" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Global keyframes */}
      <style>{`
        @keyframes spinRing    { to { transform: rotate(360deg); } }
        @keyframes shimmer     { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes floatAnim   { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        @keyframes pulseGreen  { 0%,100% { box-shadow: 0 0 4px #10b981; } 50% { box-shadow: 0 0 12px #10b981, 0 0 20px rgba(16,185,129,0.4); } }
        @keyframes blink       { 50% { opacity: 0; } }
      `}
      </style>
    </section>
  );
};

export default HeroSection;
