import { useState } from "react";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Counter, Reveal, ScrollText } from "../components/portfolio/Animations";

export function About() {
  const stats = [
    { num: "3rd Year", label: "Education", fontSize: 21 },
    {
      num: "BELTEI University",
      label: "University",
      fontSize: 21,
    },
    {
      num: "Backend · Mobile · Learning",
      label: "Interests",
      fontSize: 21,
    },
    { num: "Phnom Penh, KH", label: "Location", fontSize: 21 },
  ];
  return (
    <section
      id="about"
      className="about-section section-padding"
      style={{
        padding: "132px 56px 148px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(42px, 7vw, 96px)",
        alignItems: "center",
      }}
    >
      <Reveal>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <span style={{ width: 28, height: 1, background: COLORS.accent }} />
          <span
            style={{
              color: COLORS.accent,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            About Me
          </span>
        </div>
        <h2
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: "clamp(54px,7vw,88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.055em",
            color: COLORS.white,
            marginBottom: 30,
          }}
        >
          <ScrollText text="About" />
        </h2>
        <p
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: 15,
            lineHeight: 1.85,
            color: COLORS.white,
            marginBottom: 18,
            maxWidth: 620,
          }}
        >
          I'm a Year 03 Software Engineering student at BELTEI International
          University, currently working as a Backend Developer. I have a
          foundation in both backend and frontend development, with experience
          in building applications and designing user-friendly interfaces.
        </p>
        <p
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: 15,
            lineHeight: 1.85,
            color: COLORS.muted,
            marginBottom: 0,
            maxWidth: 620,
          }}
        >
          I believe great applications start with strong engineering principles,
          thoughtful design, and well-structured systems.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div
          className="about-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: 12,
          }}
        >
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function StatCard({ num, icon, label, fontSize = 44 }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="interactive"
      style={{
        background: hov
          ? "linear-gradient(145deg,rgba(77,240,192,0.09),rgba(255,255,255,0.025))"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? "rgba(77,240,192,0.42)" : "rgba(220,228,240,0.12)"}`,
        padding: "24px 22px",
        minHeight: 158,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          fontFamily: TYPOGRAPHY.body,
          fontSize,
          color: COLORS.accent,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          minHeight: 48,
          fontWeight: 800,
          letterSpacing: fontSize <= 22 ? "0.01em" : "-0.04em",
        }}
      >
        {icon ? (
          <span className="material-symbols-outlined" style={{ fontSize: 34 }}>
            {icon}
          </span>
        ) : (
          <Counter target={num} />
        )}
      </div>
      <div
        style={{
          fontFamily: TYPOGRAPHY.body,
          fontSize: 12,
          letterSpacing: "0.02em",
          color: COLORS.muted,
          lineHeight: 1.5,
          marginTop: 12,
        }}
      >
        {label}
      </div>
    </div>
  );
}
