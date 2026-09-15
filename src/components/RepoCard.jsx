import { memo, useContext, useCallback } from "react";
import { PinboardContext } from "../context/PinBoardContext";

function RepoCard({ repo }) {
  const { pinnedRepos, dispatch } = useContext(PinboardContext);

  const isPinned = pinnedRepos.some(
    (pinnedRepo) => pinnedRepo.id === repo.id
  );

  const togglePin = useCallback(() => {
  if (isPinned) {
    dispatch({
      type: "UNPIN_REPO",
      payload: repo.id,
    });
  } else {
    dispatch({
      type: "PIN_REPO",
      payload: repo,
    });
  }
}, [isPinned, repo, dispatch]);

  return (
    <div className = "repo-card">
      <h3>{repo.name}</h3>

      <p>{repo.description || "No description"}</p>
      <div className = "repo-stats">
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks_count}</p>
      <p>Language: {repo.language || "Not specified"}</p>
      </div>

      <button onClick={togglePin}>
        {isPinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
}

export default memo(RepoCard);