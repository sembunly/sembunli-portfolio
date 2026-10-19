export const GITHUB_USERNAME = "sembunly";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

async function requestJson(url, signal, headers = {}) {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: "application/vnd.github+json",
      ...headers,
    },
  });

  if (!response.ok) {
    const message = response.status === 403
      ? "GitHub is temporarily limiting requests. Please try again shortly."
      : `GitHub returned an error (${response.status}).`;
    throw new Error(message);
  }

  return response.json();
}

export function fetchRepositories(signal, limit = 6) {
  return requestJson(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`,
    signal,
  );
}

export async function fetchGitHubActivity(signal) {
  const contributionUrl = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
  const profileUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;
  const pullRequestsUrl = `https://api.github.com/search/issues?q=author%3A${GITHUB_USERNAME}%20type%3Apr&sort=updated&order=desc&per_page=3`;
  const reviewsUrl = `https://api.github.com/search/issues?q=reviewed-by%3A${GITHUB_USERNAME}%20type%3Apr&sort=updated&order=desc&per_page=3`;

  const [
    contributionResult,
    profileResult,
    pullRequestsResult,
    reviewsResult,
    repositoriesResult,
  ] = await Promise.allSettled([
    requestJson(contributionUrl, signal, { Accept: "application/json" }),
    requestJson(profileUrl, signal),
    requestJson(pullRequestsUrl, signal),
    requestJson(reviewsUrl, signal),
    fetchRepositories(signal, 3),
  ]);

  if (contributionResult.status === "rejected") {
    throw contributionResult.reason;
  }

  const contributionData = contributionResult.value;
  if (!Array.isArray(contributionData.contributions)) {
    throw new Error("The contribution calendar returned unexpected data.");
  }

  const totalContributions = Number(contributionData.total?.lastYear);
  const profile = profileResult.status === "fulfilled"
    ? profileResult.value
    : null;
  const pullRequestData = pullRequestsResult.status === "fulfilled"
    ? pullRequestsResult.value
    : null;
  const reviewData = reviewsResult.status === "fulfilled"
    ? reviewsResult.value
    : null;
  const repositories = repositoriesResult.status === "fulfilled" &&
    Array.isArray(repositoriesResult.value)
    ? repositoriesResult.value
    : null;

  return {
    contributions: contributionData.contributions,
    totalContributions: Number.isFinite(totalContributions)
      ? totalContributions
      : contributionData.contributions.reduce(
          (total, day) => total + (Number(day.count) || 0),
          0,
        ),
    publicRepositories: Number.isFinite(profile?.public_repos)
      ? profile.public_repos
      : null,
    pullRequests: Number.isFinite(pullRequestData?.total_count)
      ? pullRequestData.total_count
      : null,
    recentPullRequests: pullRequestsResult.status === "fulfilled" && Array.isArray(pullRequestData?.items)
      ? pullRequestData.items
      : null,
    codeReviews: Number.isFinite(reviewData?.total_count)
      ? reviewData.total_count
      : null,
    recentReviews: reviewsResult.status === "fulfilled" && Array.isArray(reviewData?.items)
      ? reviewData.items
      : null,
    repositories,
  };
}
