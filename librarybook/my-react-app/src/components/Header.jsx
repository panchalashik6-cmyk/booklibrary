
import { FiPlus, FiCalendar } from "react-icons/fi";

function Header({ onAddBook }) {
  // Aaj ki date display karna
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="dashboard-header">
      {/* Left Side */}
      <div className="header-content">
        <p className="header-welcome">
          Welcome back!
        </p>

        <h1 className="header-title">
          Library Dashboard
        </h1>

        <p className="header-description">
          Manage your books, track availability, and keep
          your library organized.
        </p>
      </div>

      {/* Right Side */}
      <div className="header-actions">
        <div className="header-date">
          <FiCalendar />

          <span>{formattedDate}</span>
        </div>

        <button
          type="button"
          className="add-book-button"
          onClick={onAddBook}
        >
          <FiPlus />

          <span>Add New Book</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
