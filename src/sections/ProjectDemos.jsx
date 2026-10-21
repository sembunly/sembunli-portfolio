import { projectDemos } from "../data/portfolioData";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Reveal, ScrollText } from "../components/portfolio/Animations";
import { SectionLabel } from "../components/portfolio/Primitives";
import { ProjectCard } from "../components/ProjectCard";

export function ProjectDemos() {
  return (
    <section
      id="project-demos"
      className="section-padding project-demos-section"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <SectionLabel>Selected work</SectionLabel>
        <h2
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: "clamp(52px,7vw,100px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 60,
          }}
        >
          <span style={{ color: COLORS.white }}>
            <ScrollText text="Project" />
          </span>{" "}
          <span style={{ color: COLORS.accent }}>
            <ScrollText text="Demo" />
          </span>
        </h2>
      </Reveal>
      <div className="project-demos-grid">
        {projectDemos.map((item, index) => (
          <ProjectCard key={item.num} {...item} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}
