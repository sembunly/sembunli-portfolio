import { useEffect, useState } from "react";
import { fetchGitHubActivity } from "../services/github";

export function useGitHubActivity() {
  const [activity, setActivity] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchGitHubActivity(controller.signal)
      .then((data) => {
        setActivity(data);
        setStatus("success");
      })
      .catch((requestError) => {
        if (requestError.name === "AbortError") return;
        setError(requestError.message || "Unable to load GitHub activity.");
        setStatus("error");
      });

    return () => controller.abort();
  }, [retryKey]);

  return {
    activity,
    status,
    error,
    retry: () => {
      setStatus("loading");
      setError("");
      setRetryKey((key) => key + 1);
    },
  };
}
