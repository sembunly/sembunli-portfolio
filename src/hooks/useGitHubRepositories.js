import { useEffect, useState } from "react";
import { fetchRepositories } from "../services/github";

export function useGitHubRepositories() {
  const [repositories, setRepositories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchRepositories(controller.signal)
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("GitHub returned an unexpected repository response.");
        }
        setRepositories(data.filter((repo) => !repo.private));
        setStatus("success");
      })
      .catch((requestError) => {
        if (requestError.name === "AbortError") return;
        setError(requestError.message || "Unable to load GitHub repositories.");
        setStatus("error");
      });

    return () => controller.abort();
  }, [retryKey]);

  return {
    repositories,
    status,
    error,
    retry: () => {
      setStatus("loading");
      setError("");
      setRetryKey((key) => key + 1);
    },
  };
}
