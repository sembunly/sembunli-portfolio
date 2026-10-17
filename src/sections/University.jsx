import { university } from "../data/portfolioData";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Reveal, ScrollText } from "../components/portfolio/Animations";
import { SectionLabel } from "../components/portfolio/Primitives";
import { ProjectCard } from "../components/ProjectCard";

export function University() {
  return (
    <section
      id="university"
      className="section-padding"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <SectionLabel>Education</SectionLabel>
        <h2
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: "clamp(52px,7vw,100px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 60,
          }}
        >
          <span style={{ color: COLORS.accent }}>
            <ScrollText text="University" />
          </span>
        </h2>
      </Reveal>
      <div
        className="projects-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
      >
        {university.map((item, i) => (
          <ProjectCard key={item.num} {...item} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
