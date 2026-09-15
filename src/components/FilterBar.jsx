function FilterBar({
  languages,
  selectedLanguages,
  setSelectedLanguages,
  sortBy,
  setSortBy,
}) {
  function toggleLanguage(language) {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((item) => item !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  }

  return (
    <div className = "filter-bar">
      <h3>Languages</h3>

      {languages.map((language) => (
        <label key={language}>
          <input
            type="checkbox"
            checked={selectedLanguages.includes(language)}
            onChange={() => toggleLanguage(language)}
          />
          {language}
        </label>
      ))}

      <h3>Sort</h3>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="updated">Recently Updated</option>
        <option value="stars">Most Stars</option>
        <option value="forks">Most Forks</option>
      </select>
    </div>
  );
}

export default FilterBar;