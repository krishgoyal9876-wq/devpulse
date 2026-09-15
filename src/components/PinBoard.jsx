import { useContext, useState } from "react";
import { PinboardContext } from "../context/PinBoardContext";

function Pinboard() {
  const { pinnedRepos, dispatch } = useContext(PinboardContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className = "pinboard">
      <button onClick={() => setIsOpen(!isOpen)}>
        Pinboard ({pinnedRepos.length})
      </button>

      {isOpen && (
        <div className = "pinboard-panel">
          <h2>Pinboard</h2>

          {pinnedRepos.length === 0 ? (
            <p>No pinned repositories.</p>
          ) : (
            pinnedRepos.map((repo) => (
              <div key={repo.id}>
                <h3>{repo.name}</h3>

                <p>
                  Stars: {repo.stargazers_count}
                </p>

                <button
                  onClick={() =>
                    dispatch({
                      type: "UNPIN_REPO",
                      payload: repo.id,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Pinboard;