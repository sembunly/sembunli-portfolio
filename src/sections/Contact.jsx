import { useState } from "react";
import { contacts } from "../data/portfolioData";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Reveal, ScrollText } from "../components/portfolio/Animations";
import { SectionLabel } from "../components/portfolio/Primitives";

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section section-padding"
      style={{
        padding: "0 56px 120px",
      }}
    >
      <div className="contact-panel">
        <Reveal>
          <div className="contact-intro">
            <SectionLabel>Get in touch</SectionLabel>
            <h2
              style={{
                fontFamily: TYPOGRAPHY.body,
                fontSize: "clamp(48px,6vw,78px)",
                lineHeight: 0.98,
                letterSpacing: "-0.055em",
                color: COLORS.white,
                marginBottom: 22,
              }}
            >
              <ScrollText text="Let's build" />
              <br />
              <span style={{ color: COLORS.accent }}>
                <ScrollText text="something." />
              </span>
            </h2>
            <p className="contact-copy">
              Open to projects, collaborations, and new opportunities. Have an
              idea in mind? Let’s talk.
            </p>
            <a
              className="contact-email-cta"
              href="mailto:sembunly2005@gmail.com"
            >
              Send me an email <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="contact-methods">
            {contacts.map((c, i) => (
              <ContactRow key={i} {...c} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactRow({ icon, label, value, href, target }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="interactive"
      style={{
        background: hov ? "#101418" : COLORS.card,
        border: `1px solid ${hov ? COLORS.accent : COLORS.border}`,
        padding: "18px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textDecoration: "none",
        transition: "all 0.3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 22, color: COLORS.accent }}
        >
          {icon}
        </span>
        <div>
          <div
            style={{
              fontFamily: TYPOGRAPHY.body,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: TYPOGRAPHY.body,
              fontSize: 13,
              color: COLORS.white,
              marginTop: 3,
            }}
          >
            {value}
          </div>
        </div>
      </div>
      <span
        className="material-symbols-outlined"
        style={{
          color: hov ? COLORS.accent : COLORS.muted,
          transform: hov ? "translate(2px,-2px)" : "none",
          transition: "all 0.2s",
          fontSize: 20,
        }}
      >
        north_east
      </span>
    </a>
  );
}
