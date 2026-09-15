function SearchBar({ username, setUsername }) {
  return (
    <div className = "search-section">
      <input
        type="text"
        placeholder="Search GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;