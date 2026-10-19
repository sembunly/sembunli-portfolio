import { FaGithub } from "react-icons/fa";
import { GITHUB_PROFILE_URL } from "../services/github";
import { useGitHubActivity } from "../hooks/useGitHubActivity";
import { COLORS } from "../theme/tokens";
import { Reveal, ScrollText } from "../components/portfolio/Animations";
import { SectionLabel } from "../components/portfolio/Primitives";
import { GitHubContributionCalendar } from "../components/GitHubContributionCalendar";

const numberFormat = new Intl.NumberFormat();

function ActivityStat({ label, value }) {
  return (
    <div className="github-activity-stat">
      <span>{numberFormat.format(value)}</span>
      <small>{label}</small>
    </div>
  );
}

function ActivityFeedCard({ title, description, items, totalCount, kind }) {
  const hasItems = Array.isArray(items);
  const feedItems = items ?? [];

  return (
    <section className="github-activity-feed-card" aria-label={title}>
      <div className="github-activity-feed-heading">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="github-activity-feed-count">
          {totalCount === null || totalCount === undefined
            ? "—"
            : numberFormat.format(totalCount)}
        </span>
      </div>
      {feedItems.length > 0 ? (
        <ul className="github-activity-feed-list">
          {feedItems.map((item) => {
            const repoName = item.repository_url?.split("/repos/")[1];
            return (
              <li key={item.id}>
                <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                {repoName && <span>{repoName}</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="github-activity-feed-empty">
          {!hasItems
            ? "Activity is unavailable right now."
            : kind === "reviews"
              ? "No public reviews found."
              : "No public pull requests found."}
        </p>
      )}
    </section>
  );
}

function RepositoryLinksCard({ repositories }) {
  return (
    <section className="github-activity-feed-card" aria-label="Recently updated repositories">
      <div className="github-activity-feed-heading">
        <div>
          <h3>Repositories</h3>
          <p>Recently updated public projects</p>
        </div>
        <span className="github-activity-feed-count">{repositories?.length ?? "—"}</span>
      </div>
      {repositories?.length ? (
        <ul className="github-activity-feed-list github-activity-repositories">
          {repositories.map((repository) => (
            <li key={repository.id}>
              <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                {repository.name} <span aria-hidden="true">↗</span>
              </a>
              <span>{repository.description || repository.language || "Public repository"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="github-activity-feed-empty">Repository details are unavailable right now.</p>
      )}
    </section>
  );
}

export function GitHubActivity() {
  const { activity, status, error, retry } = useGitHubActivity();
  const stats = activity
    ? [
        { label: "Contributions · last year", value: activity.totalContributions },
        activity.publicRepositories !== null && {
          label: "Public repositories",
          value: activity.publicRepositories,
        },
        activity.codeReviews !== null && {
          label: "Pull requests reviewed",
          value: activity.codeReviews,
        },
        activity.pullRequests !== null && {
          label: "Pull requests",
          value: activity.pullRequests,
        },
      ].filter(Boolean)
    : [];

  return (
    <section
      id="activity"
      className="section-padding github-activity-section"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <SectionLabel>Open source activity</SectionLabel>
        <h2 className="github-activity-title">
          <span style={{ color: COLORS.white }}><ScrollText text="GitHub " /></span>
          <span style={{ color: COLORS.accent }}><ScrollText text="Activity" /></span>
        </h2>
      </Reveal>

      <div className="github-activity-panel" aria-busy={status === "loading"}>
        <div className="github-activity-header">
          <div>
            <p className="github-activity-kicker">Contribution calendar</p>
            <p className="github-activity-caption">A year of activity from my public GitHub profile</p>
          </div>
          <a
            className="github-activity-profile-link"
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            View GitHub profile <span aria-hidden="true">↗</span>
          </a>
        </div>

        {status === "loading" && (
          <div className="github-activity-loading" role="status">
            <span className="github-repos-sr-only">Loading GitHub activity…</span>
            <div className="github-calendar-skeleton" aria-hidden="true">
              {Array.from({ length: 371 }, (_, index) => <i key={index} />)}
            </div>
            <div className="github-activity-stat-skeleton" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="github-activity-error" role="alert">
            <strong>GitHub activity is temporarily unavailable.</strong>
            <p>{error}</p>
            <button type="button" className="github-retry-button" onClick={retry}>
              Try again <span aria-hidden="true">↻</span>
            </button>
          </div>
        )}

        {status === "success" && activity && (
          <>
            <div className="github-activity-stats">
              {stats.map(({ label, value }) => (
                <ActivityStat key={label} label={label} value={value} />
              ))}
            </div>
            <GitHubContributionCalendar contributions={activity.contributions} />
            <div className="github-activity-feeds">
              <RepositoryLinksCard repositories={activity.repositories} />
              <ActivityFeedCard
                title="Code reviews"
                description="Public pull requests reviewed"
                items={activity.recentReviews}
                totalCount={activity.codeReviews}
                kind="reviews"
              />
              <ActivityFeedCard
                title="Pull requests"
                description="Recently updated contributions"
                items={activity.recentPullRequests}
                totalCount={activity.pullRequests}
                kind="pull-requests"
              />
            </div>
          </>
        )}
      </div>
      <p className="github-activity-source">
        Contributions are read from the public{" "}
        <a
          href="https://github.com/grubersjoe/github-contributions-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub contribution calendar API
        </a>
        .
      </p>
    </section>
  );
}
