
import React from "react";
import { FiBookOpen } from "react-icons/fi";
import BookCard from "./BookCard";

function BookList({
  books,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  // Agar books ki list empty hai
  if (books.length === 0) {
    return (
      <div className="book-list-empty">
        <div className="empty-icon">
          <FiBookOpen />
        </div>

        <h3>No books found</h3>

        <p>
          No books are available to display.
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default BookList;
