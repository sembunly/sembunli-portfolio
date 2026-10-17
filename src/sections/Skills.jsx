import { createElement } from "react";
import { skillGroups } from "../data/portfolioData";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Reveal, ScrollText } from "../components/portfolio/Animations";

export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <h2
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: "clamp(48px,7vw,88px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 42,
          }}
        >
          <ScrollText text="Skills" />
        </h2>
      </Reveal>
      <div
        className="skill-groups"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 28,
          alignItems: "stretch",
        }}
      >
        {skillGroups.map((group, i) => (
          <SkillGroup key={group.title} {...group} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

export function SkillGroup({ title, icon: GroupIconComponent, description, items, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="skill-group-card" style={{ height: "100%" }}>
        {createElement(GroupIconComponent, {
          "aria-hidden": true,
          style: { color: COLORS.accent2, fontSize: 32, marginBottom: 22 },
        })}
        <div
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: "clamp(22px, 2vw, 28px)",
            fontWeight: 700,
            letterSpacing: "0.01em",
            color: COLORS.white,
            marginBottom: 12,
          }}
        >
          {title}
        </div>
        <p className="skill-group-description">{description}</p>
        <div
          className="skill-tile-list"
          style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
        >
          {items.map(([name, IconComponent, color]) => (
            <div
              key={name}
              className="skill-tile"
              style={{
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "7px 11px",
                border: "1px solid rgba(220,228,240,0.15)",
                background: "rgba(255,255,255,0.035)",
                color: COLORS.white,
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition:
                  "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              {createElement(IconComponent, {
                "aria-hidden": true,
                style: { color, fontSize: 20, flexShrink: 0 },
              })}
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
