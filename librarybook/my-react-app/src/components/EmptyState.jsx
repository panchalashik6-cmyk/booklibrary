
import { FiBookOpen, FiSearch } from "react-icons/fi";

function EmptyState({ searchTerm, selectedCategory, onClearFilters }) {
  const hasFilters =
    searchTerm.trim() !== "" || selectedCategory !== "All";

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {hasFilters ? <FiSearch /> : <FiBookOpen />}
      </div>

      <h3>
        {hasFilters ? "No books found" : "Your library is empty"}
      </h3>

      <p>
        {hasFilters
          ? "We couldn't find any books matching your search or selected category."
          : "There are no books to display right now. Add your first book to get started."}
      </p>

      {hasFilters && (
        <button
          type="button"
          className="clear-filters-button"
          onClick={onClearFilters}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;
