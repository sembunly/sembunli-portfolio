import { createElement, useEffect, useState } from "react";
import profileImg from "../assets/man1.png";
import { socialLinks as profileLinks } from "../data/portfolioData";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Reveal } from "../components/portfolio/Animations";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const anim = (delay, targetTransform = "translateY(0)") => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? targetTransform : "translateY(40px)",
    transition: `all 1s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
  });



  return (
    <section
      id="home"
      style={{
        minHeight: "min(900px, 100svh)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "112px clamp(24px, 7vw, 104px) 0",
        position: "relative",
        overflow: "hidden",
        background: "#000000",
      }}
    >
      <div
        className="hero-content"
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <div
          className="hero-text"
          style={{
            flex: "1 1 540px",
            minWidth: "280px",
            paddingBottom: "24px",
          }}
        >
          <h1
            style={{
              ...anim(0.2),
              fontFamily: TYPOGRAPHY.body,
              fontSize: "clamp(72px, 9.6vw, 142px)",
              lineHeight: 0.88,
              letterSpacing: "-0.065em",
              margin: 0,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            <span style={{ color: COLORS.white }}>Sem</span>
            <br />
            <span style={{ color: COLORS.accent }}>Bunly</span>
          </h1>

          <p
            className="hero-role"
            style={{
              ...anim(0.35),
              marginTop: "24px",
              color: COLORS.white,
              fontSize: "clamp(15px, 1.5vw, 19px)",
              lineHeight: 1.6,
              maxWidth: "520px",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            Backend Developer <span style={{ color: COLORS.accent }}>·</span> Software Engineering Student
          </p>

          <p className="hero-summary" style={{ ...anim(0.42) }}>
            Building reliable backend systems and thoughtful digital experiences.
          </p>

          <div
            className="hero-actions"
            style={{
              ...anim(0.5),
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "28px",
            }}
          >
            <a
              className="hero-action hero-action-primary"
              href="#projects"
              style={{
                padding: "13px 25px",
                borderRadius: "999px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "15px",
                letterSpacing: "0.02em",
              }}
            >
              View Work <span aria-hidden="true">→</span>
            </a>
            <a
              className="hero-action hero-action-secondary"
              href="https://docs.bunli-it.site/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "13px 25px",
                borderRadius: "999px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "15px",
                letterSpacing: "0.02em",
              }}
            >
              Project <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div
          className="hero-image"
          style={{
            ...anim(0.3, "translateY(20px)"),
            flex: "1 1 390px",
            minWidth: "280px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <div
            className="hero-portrait-wrap"
            style={{
              position: "relative",
              width: "min(100%, 560px)",
              height: "clamp(400px, 44vw, 610px)",
              minHeight: "400px",
              overflow: "hidden",
              borderRadius: 0,
              background: "transparent",
              border: "none",
            }}
          >
            <img
              src={profileImg}
              alt="Sem Bunly"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "-4px",
                transform: "translateX(-50%)",
                width: "min(104%, 620px)",
                maxHeight: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                zIndex: 2,
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* <picture
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <source media="(max-width: 768px)" srcSet={profileImgMobile} />
            <img
              src={profileImg}
              alt="Sem Bunly"
              style={{
                width: "100%",
                maxWidth: "620px",
                height: "auto",
                objectFit: "contain",
                display: "block",
                marginBottom: "-20px",
                userSelect: "none",
                pointerEvents: "none",
                filter: "drop-shadow(0 25px 45px rgba(77,240,192,0.18))",
              }}
            />
          </picture> */}
        </div>
      </div>
      <div className="hero-socials" aria-label="Social profiles">
        {profileLinks.map(({ label, value, href, Icon }, index) => {
          return (
          <a
            key={label}
            className="hero-social-card"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...anim(0.58 + index * 0.06) }}
          >
            <span className="hero-social-icon">
              {createElement(Icon, { "aria-hidden": true })}
            </span>
            <span className="hero-social-copy">
              <strong>{label}</strong>
              <small>{value}</small>
            </span>
          </a>
          );
        })}
      </div>
    </section>
  );
}
