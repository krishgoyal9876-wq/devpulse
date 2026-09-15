import { useMemo, useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import useDebounce from "./hooks/useDebounce";
import RepoCard from "./components/RepoCard";
import FilterBar from "./components/FilterBar";
import Pinboard from "./components/PinBoard";

function App() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(() => {
  const params = new URLSearchParams(window.location.search);
  return params.get("user") || "";
});
  const debouncedUsername = useDebounce(username, 500);

const [selectedLanguages, setSelectedLanguages] = useState(() => {
  const params = new URLSearchParams(window.location.search);
  const languages = params.get("lang");

  return languages ? languages.split(",") : [];
});

const [sortBy, setSortBy] = useState(() => {
  const params = new URLSearchParams(window.location.search);
  return params.get("sort") || "updated";
});

useEffect(() => {
  if (!debouncedUsername) {
    setProfile(null);
    setRepos([]);
    setError("");
    return;
  }

  setIsLoading(true);
  setError("");

  fetch(`/api/users/${debouncedUsername}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }

      return response.json();
    })
    .then((data) => {
      setProfile(data);
    })
    .catch((error) => {
      setError(error.message);
      setProfile(null);
      setRepos([]); 
    });

  fetch(`/api/users/${debouncedUsername}/repos?per_page=100`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load repositories");
    }

    return response.json();
  })
  .then((data) => {
    setRepos(data);
  })
  .catch((error) => {
    setError(error.message);
    setRepos([]);
  })
  .finally(() => {
    setIsLoading(false);
  });
}, [debouncedUsername]);

 const languages = useMemo(() => { 
    const languageSet = new Set();
    repos.forEach((repo) => {
      if (repo.language) {
        languageSet.add(repo.language);
      }
    });
    return [...languageSet];
  }, [repos]);

  const filteredRepos = useMemo(() => {
  let result = [...repos];

  if (selectedLanguages.length > 0) {
    result = result.filter((repo) =>
      selectedLanguages.includes(repo.language)
    );
  }

  if (sortBy === "stars") {
    result.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
  }

  if (sortBy === "forks") {
    result.sort((a, b) => b.forks_count - a.forks_count);
  }

  if (sortBy === "updated") {
    result.sort(
      (a, b) =>
        new Date(b.updated_at) - new Date(a.updated_at)
    );
  }

  return result;
}, [repos, selectedLanguages, sortBy]);

useEffect(() => {       //to update url
  const params = new URLSearchParams();

  if (username) {
    params.set("user", username);
  }

  if (selectedLanguages.length > 0) {
    params.set("lang", selectedLanguages.join(","));
  }

  params.set("sort", sortBy);

  const queryString = params.toString();

  const newUrl = queryString
    ? `/inspect?${queryString}`
    : "/inspect";

  window.history.replaceState({}, "", newUrl);
}, [username, selectedLanguages, sortBy]);

  return (
    <div>
     <div className="header"> 
      <div>
      <h1>DevPulse</h1>
      <p>GitHub Inspector</p>
     </div>
     </div>

      <Pinboard />

      <SearchBar
        username={username}
        setUsername={setUsername}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {profile && (
  <div className="profile-card">
    <img
      src={profile.avatar_url}
      alt={profile.login}
    />

    <div className="profile-info">
      <h2>{profile.name || profile.login}</h2>

      <p className="bio">
        {profile.bio || "No bio available."}
      </p>

      <p className="followers">
        Followers: {profile.followers}
      </p>
    </div>
  </div>
)}

{profile && (
  <FilterBar
    languages={languages}
    selectedLanguages={selectedLanguages}
    setSelectedLanguages={setSelectedLanguages}
    sortBy={sortBy}
    setSortBy={setSortBy}
  />
)}

{filteredRepos.length > 0 && (
  <div>
    <h2 className = "repositories-title">Repositories</h2>
    <div className="repo-list">
    {filteredRepos.map((repo) => (
      <RepoCard key={repo.id} repo={repo} />
    ))}
  </div>
  </div>
)}

    </div>
  );
}

export default App;