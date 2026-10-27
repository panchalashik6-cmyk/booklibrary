

import { FiSearch, FiX } from "react-icons/fi";

function SearchBar({ searchTerm, setSearchTerm }) {

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search books by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Search books by title"
      />


      {searchTerm && (
        <button
          type="button"
          className="clear-search-button"
          onClick={handleClearSearch}
          aria-label="Clear search"
          title="Clear search"
        >
          <FiX />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
