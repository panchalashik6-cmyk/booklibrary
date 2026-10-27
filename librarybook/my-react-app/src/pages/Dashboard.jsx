
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import DeleteConfirmation from "../components/DeleteConfirmation";

import initialBooks from "../data/books";

import {
  FiMenu,
  FiPlus,
  FiBookOpen,
  FiRefreshCw,
} from "react-icons/fi";

function Dashboard() {
  // All books
  const [books, setBooks] = useState(initialBooks);

  // Search and category filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Delete confirmation state
  const [bookToDelete, setBookToDelete] = useState(null);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // Get unique categories from books
  const categories = useMemo(() => {
    return [...new Set(books.map((book) => book.category))].sort();
  }, [books]);

  // Dashboard counts always use the complete books array
  const totalBooks = books.length;

  const availableBooks = books.filter(
    (book) => book.status === "Available"
  ).length;

  const issuedBooks = books.filter(
    (book) => book.status === "Issued"
  ).length;

  // Search and filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        book.category === selectedCategory;

      const matchesPage =
        activePage === "Available Books"
          ? book.status === "Available"
          : activePage === "Issued Books"
            ? book.status === "Issued"
            : true;

      return matchesSearch && matchesCategory && matchesPage;
    });
  }, [books, searchTerm, selectedCategory, activePage]);

  // Open form for adding a book
  const handleAddBook = () => {
    setSelectedBook(null);
    setIsFormOpen(true);
  };

  // Open form for editing a book
  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  // Add or update a book
  const handleSaveBook = (bookData) => {
    if (selectedBook) {
      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book.id === selectedBook.id
            ? { ...book, ...bookData }
            : book
        )
      );
    } else {
      const newBook = {
        id: Date.now(),
        ...bookData,
      };

      setBooks((previousBooks) => [
        newBook,
        ...previousBooks,
      ]);
    }

    setIsFormOpen(false);
    setSelectedBook(null);
  };

  // Open delete confirmation
  const handleDeleteRequest = (bookId) => {
    const book = books.find((item) => item.id === bookId);

    if (book) {
      setBookToDelete(book);
    }
  };

  // Delete selected book
  const handleConfirmDelete = (bookId) => {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book.id !== bookId)
    );

    setBookToDelete(null);
  };

  // Toggle Available / Issued status
  const handleToggleStatus = (bookId) => {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              status:
                book.status === "Available"
                  ? "Issued"
                  : "Available",
            }
          : book
      )
    );
  };

  // Clear search and category filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");

    if (
      activePage === "Available Books" ||
      activePage === "Issued Books"
    ) {
      setActivePage("All Books");
    }
  };

  // Return to dashboard view
  const handleDashboardClick = () => {
    setActivePage("Dashboard");
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main content */}
      <main className="main-content">
        {/* Mobile header */}
        <div className="mobile-topbar">
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <FiMenu />
          </button>

          <div className="mobile-brand">
            <FiBookOpen />
            <span>BookNest</span>
          </div>

          <button
            type="button"
            className="mobile-add-button"
            onClick={handleAddBook}
            aria-label="Add new book"
          >
            <FiPlus />
          </button>
        </div>

        {/* Page header */}
        <Header onAddBook={handleAddBook} />

        {/* Dashboard statistics */}
        <section className="stats-grid" aria-label="Library statistics">
          <StatCard
            title="Total Books"
            value={totalBooks}
            type="total"
          />

          <StatCard
            title="Available Books"
            value={availableBooks}
            type="available"
          />

          <StatCard
            title="Issued Books"
            value={issuedBooks}
            type="issued"
          />
        </section>

        {/* Books section */}
        <section className="books-section">
          <div className="books-section-heading">
            <div>
              <h2>
                {activePage === "Available Books"
                  ? "Available Books"
                  : activePage === "Issued Books"
                    ? "Issued Books"
                    : activePage === "All Books"
                      ? "All Books"
                      : activePage}
              </h2>

              <p>
                Browse, organize, and manage your library collection.
              </p>
            </div>

            <button
              type="button"
              className="section-add-button"
              onClick={handleAddBook}
            >
              <FiPlus />
              <span>Add Book</span>
            </button>
          </div>

          {/* Search and category filter */}
          <div className="books-toolbar">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />

            {(searchTerm || selectedCategory !== "All") && (
              <button
                type="button"
                className="reset-filter-button"
                onClick={handleClearFilters}
              >
                <FiRefreshCw />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Result count */}
          <div className="results-summary">
            <span>
              Showing <strong>{filteredBooks.length}</strong>{" "}
              {filteredBooks.length === 1 ? "book" : "books"}
            </span>
          </div>

          {/* Book list or empty state */}
          {filteredBooks.length > 0 ? (
            <BookList
              books={filteredBooks}
              onEdit={handleEditBook}
              onDelete={handleDeleteRequest}
              onToggleStatus={handleToggleStatus}
            />
          ) : (
            <EmptyState
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              onClearFilters={handleClearFilters}
            />
          )}
        </section>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>
            © {new Date().getFullYear()} BookNest Library Management
          </p>

          <button
            type="button"
            onClick={handleDashboardClick}
          >
            <FiBookOpen />
            <span>Back to Dashboard</span>
          </button>
        </footer>
      </main>

      {/* Add / Edit book modal */}
      {isFormOpen && (
        <BookForm
          selectedBook={selectedBook}
          onSave={handleSaveBook}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedBook(null);
          }}
        />
      )}

      {/* Delete confirmation modal */}
      {bookToDelete && (
        <DeleteConfirmation
          book={bookToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setBookToDelete(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
