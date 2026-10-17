import { FaCodeBranch, FaGithub, FaStar } from "react-icons/fa";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Reveal, ScrollText } from "../components/portfolio/Animations";
import { SectionLabel } from "../components/portfolio/Primitives";
import { useGitHubRepositories } from "../hooks/useGitHubRepositories";

export function Projects() {
  const { repositories, status, error, retry } = useGitHubRepositories();

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <SectionLabel>GitHub · Recent work</SectionLabel>
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
            <ScrollText text="Projects" />
          </span>
        </h2>
      </Reveal>
      <div className="github-repos-grid" aria-busy={status === "loading"}>
        {status === "loading" && (
          <p className="github-repos-sr-only" role="status">
            Loading recent GitHub repositories…
          </p>
        )}
        {status === "loading" &&
          Array.from({ length: 9 }, (_, index) => (
            <div className="github-repo-skeleton" key={index} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ))}

        {status === "error" && (
          <div className="github-repos-message" role="alert">
            <strong>Couldn’t load repositories</strong>
            <p>{error}</p>
            <button
              type="button"
              className="github-retry-button"
              onClick={retry}
            >
              Try again <span aria-hidden="true">↻</span>
            </button>
          </div>
        )}

        {status === "success" && repositories.length === 0 && (
          <p className="github-repos-message" role="status">
            No public repositories found.
          </p>
        )}

        {status === "success" &&
          repositories.map((repository, index) => (
            <Reveal key={repository.id} delay={index * 0.06}>
              <GitHubRepositoryCard repository={repository} />
            </Reveal>
          ))}
      </div>
    </section>
  );
}

export function GitHubRepositoryCard({ repository }) {
  return (
    <article className="github-repo-card">
      <div className="github-repo-heading">
        <FaGithub aria-hidden="true" className="github-repo-icon" />
        <h3>
          <a
            className="github-repo-title"
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repository.name}
          </a>
        </h3>
      </div>
      <p className="github-repo-description">
        {repository.description || "A public project on GitHub."}
      </p>
      <div className="github-repo-footer">
        <div className="github-repo-meta" aria-label="Repository details">
          {repository.language && (
            <span className="github-repo-language" aria-label={`Language: ${repository.language}`}>
              {repository.language}
            </span>
          )}
          <span aria-label={`${repository.stargazers_count} stars`}>
            <FaStar aria-hidden="true" />
            {repository.stargazers_count.toLocaleString()}
          </span>
          <span aria-label={`${repository.forks_count} forks`}>
            <FaCodeBranch aria-hidden="true" />
            {repository.forks_count.toLocaleString()}
          </span>
        </div>
        <a
          className="github-repo-link"
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${repository.name} repository on GitHub`}
        >
          View Repository <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
