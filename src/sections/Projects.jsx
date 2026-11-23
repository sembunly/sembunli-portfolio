import { FaCodeBranch, FaGithub, FaStar } from "react-icons/fa";

export function Projects() {
  return null;
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
