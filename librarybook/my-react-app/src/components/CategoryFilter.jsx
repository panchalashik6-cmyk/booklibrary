
import { FiFilter } from "react-icons/fi";

function CategoryFilter(props) {
  const selectedCategory = props.selectedCategory;
  const setSelectedCategory = props.setSelectedCategory;
  const categories = props.categories;

  return (
    <div className="category-filter">
      <FiFilter className="filter-icon" />

      <select
        className="category-select"
        value={selectedCategory}
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
        aria-label="Filter books by category"
      >
        <option value="All">
          All Categories
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
