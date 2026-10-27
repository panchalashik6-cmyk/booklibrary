# 📚 BookNest - Library Book Management System

A modern, responsive, and intuitive Library Book Management web application built with **React** and **Vite**. BookNest allows users to catalog, search, filter, issue, return, and manage library books with seamless real-time state management.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture & How the Logic Works](#architecture--how-the-logic-works)
  - [1. State Management & Single Source of Truth](#1-state-management--single-source-of-truth)
  - [2. Search, Category & Page Filtering Pipeline](#2-search-category--page-filtering-pipeline)
  - [3. Dynamic Statistics Calculation](#3-dynamic-statistics-calculation)
  - [4. CRUD Operations Logic](#4-crud-operations-logic)
  - [5. Form Handling & Client-Side Validation](#5-form-handling--client-side-validation)
  - [6. Delete Confirmation Flow](#6-delete-confirmation-flow)
- [Component Hierarchy & Responsibilities](#component-hierarchy--responsibilities)
- [Data Model](#data-model)
- [Project Directory Structure](#project-directory-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [License](#license)

---

## 🌟 Key Features

- **Live Analytics Dashboard**: Real-time counters displaying Total Books, Available Books, and Issued Books.
- **Full CRUD Management**: Add new books, edit existing records, delete entries, and toggle issue status.
- **Multi-Condition Search & Filtering**:
  - Case-insensitive search by book title.
  - Category dropdown filter dynamically generated from active book inventory.
  - Sidebar tabs (`Dashboard`, `All Books`, `Available Books`, `Issued Books`).
- **Interactive Modals**:
  - Unified Add/Edit book modal with inline validation.
  - Safe delete confirmation modal preventing accidental data loss.
- **One-Click Issue/Return**: Switch book availability status instantly between "Available" and "Issued".
- **Responsive Layout**: Designed for mobile, tablet, and desktop with a collapsible sidebar and mobile top bar.
- **Graceful Empty State**: Helpful reset action when search/filter criteria match zero results.

---

## 🧠 Architecture & How the Logic Works

### 1. State Management & Single Source of Truth

The entire application state is lifted to the top-level page component: [`Dashboard.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/pages/Dashboard.jsx).

```
                      +-------------------+
                      |   Dashboard.jsx   |  <--- Single Source of Truth
                      +---------+---------+
                                |
       +------------------------+------------------------+
       |                        |                        |
       v                        v                        v
+--------------+       +------------------+       +---------------+
|   Sidebar    |       | Books & Filters  |       |    Modals     |
| (Navigation) |       | (Search/Filter)  |       | (Form/Delete) |
+--------------+       +------------------+       +---------------+
```

The core state hooks inside `Dashboard.jsx`:
- `books`: Array of book objects initialized from [`data/books.js`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/data/books.js).
- `searchTerm`: Query string typed into the search bar.
- `selectedCategory`: Currently selected category (defaults to `"All"`).
- `activePage`: Currently selected sidebar menu view (`"Dashboard"`, `"All Books"`, `"Available Books"`, `"Issued Books"`).
- `isFormOpen`: Boolean flag controlling the Add/Edit modal visibility.
- `selectedBook`: Holds the book object when editing, or `null` when adding a new book.
- `bookToDelete`: Holds the book object awaiting delete confirmation, or `null`.
- `isSidebarOpen`: Controls the mobile drawer sidebar visibility.

---

### 2. Search, Category & Page Filtering Pipeline

To ensure optimal performance and avoid unnecessary recalculations during re-renders, the filtered book list is computed using `useMemo`:

```javascript
const filteredBooks = useMemo(() => {
  return books.filter((book) => {
    // 1. Title match (case-insensitive & trimmed)
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    // 2. Category match
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    // 3. Navigation page filter (All / Available / Issued)
    const matchesPage =
      activePage === "Available Books"
        ? book.status === "Available"
        : activePage === "Issued Books"
        ? book.status === "Issued"
        : true;

    return matchesSearch && matchesCategory && matchesPage;
  });
}, [books, searchTerm, selectedCategory, activePage]);
```

#### How the Filter Logic Works:
1. **Search Query**: Compares `book.title.toLowerCase()` against `searchTerm.trim().toLowerCase()`.
2. **Category**: If `"All"` is selected, every category passes. Otherwise, matches exact category names.
3. **Sidebar View**:
   - `Available Books`: Retains only books where `status === "Available"`.
   - `Issued Books`: Retains only books where `status === "Issued"`.
   - `Dashboard` / `All Books`: Includes all records.
4. **Dynamic Categories**: Category options are dynamically extracted from existing books using:
   ```javascript
   const categories = useMemo(() => {
     return [...new Set(books.map((b) => b.category))].sort();
   }, [books]);
   ```

---

### 3. Dynamic Statistics Calculation

Library metrics displayed in [`StatCard.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/StatCard.jsx) are derived directly from the master `books` array:

- **Total Books**: `books.length`
- **Available Books**: `books.filter(b => b.status === "Available").length`
- **Issued Books**: `books.filter(b => b.status === "Issued").length`

Because these depend directly on the master `books` state, stats remain consistent regardless of whatever search queries or category filters are active on the page.

---

### 4. CRUD Operations Logic

All operations follow immutable state updates via React's `setBooks(previousBooks => ...)` pattern:

| Operation | Handler Function | Mechanism |
|---|---|---|
| **Create (Add)** | `handleSaveBook` | Generates a new book object with `id: Date.now()` and prepends it: `[newBook, ...previousBooks]`. |
| **Read** | `BookList` & `BookCard` | Maps over `filteredBooks` to render responsive cards with author, category, and status badges. |
| **Update (Edit)** | `handleSaveBook` | Identifies the book by `book.id === selectedBook.id` and merges updated fields: `{ ...book, ...bookData }`. |
| **Delete** | `handleConfirmDelete` | Filters out the book matching `book.id !== bookId`. |
| **Status Toggle** | `handleToggleStatus` | Toggles status between `"Available"` and `"Issued"` for the target book ID. |

---

### 5. Form Handling & Client-Side Validation

The [`BookForm.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/BookForm.jsx) component manages local form state:

- **Mode Detection**: Checks `Boolean(selectedBook)`. If present, pre-populates fields for editing; otherwise, initializes empty fields for creation.
- **Validation Rules**:
  - `title`: Cannot be empty / whitespace.
  - `author`: Cannot be empty / whitespace.
  - `category`: Must select a valid category option.
- **Live Error Clearing**: When an invalid field is typed into, its specific error message automatically clears.
- **Submission**: On passing validation, invokes `onSave(bookData)` to notify `Dashboard.jsx`.

---

### 6. Delete Confirmation Flow

To prevent accidental deletions:
1. Clicking the trash icon on a card triggers `handleDeleteRequest(bookId)`.
2. This sets `bookToDelete` to the selected book object.
3. The [`DeleteConfirmation.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/DeleteConfirmation.jsx) modal mounts, showing the exact book title.
4. If confirmed, `handleConfirmDelete(book.id)` removes the item from state and dismisses the modal.

---

## 🧩 Component Hierarchy & Responsibilities

| Component | Responsibility |
|---|---|
| [`App.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/App.jsx) | Root container mounting the `Dashboard`. |
| [`Dashboard.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/pages/Dashboard.jsx) | Orchestrator holding state, business logic, handlers, and layout. |
| [`Sidebar.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/Sidebar.jsx) | Navigation bar (Dashboard, All Books, Available Books, Issued Books). |
| [`Header.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/Header.jsx) | Welcome banner, today's formatted date, and global "Add New Book" button. |
| [`StatCard.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/StatCard.jsx) | Reusable metric card with icons and counts. |
| [`SearchBar.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/SearchBar.jsx) | Search input with live text binding and clear icon. |
| [`CategoryFilter.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/CategoryFilter.jsx) | Dynamic dropdown to filter books by genre/category. |
| [`BookList.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/BookList.jsx) | Grid wrapper rendering list of `BookCard` elements. |
| [`BookCard.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/BookCard.jsx) | Individual book display showing title, author, category, status pill, and action buttons. |
| [`BookForm.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/BookForm.jsx) | Add / Edit modal dialog with input validation. |
| [`DeleteConfirmation.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/DeleteConfirmation.jsx) | Modal dialog asking for confirmation before deleting a book. |
| [`EmptyState.jsx`](file:///c:/Users/rames/Downloads/library-book-management/librarybook/my-react-app/src/components/EmptyState.jsx) | Displayed when no books match the search/filter criteria. |

---

## 📊 Data Model

Each book in the system is structured as follows:

```typescript
interface Book {
  id: number | string;      // Unique identifier (e.g. Date.now())
  title: string;            // Book title
  author: string;           // Author full name
  category: string;         // Genre/Category (e.g., "Technology", "Finance")
  status: "Available" | "Issued"; // Availability state
}
```

---

## 📁 Project Directory Structure

```text
library-book-management/
├── .gitignore
├── README.md
└── librarybook/
    ├── package.json
    └── my-react-app/
        ├── index.html
        ├── package.json
        ├── vite.config.js
        ├── eslint.config.js
        ├── public/
        │   ├── favicon.svg
        │   └── icons.svg
        └── src/
            ├── App.jsx
            ├── main.jsx
            ├── index.css
            ├── assets/
            │   ├── hero.png
            │   ├── react.svg
            │   └── vite.svg
            ├── data/
            │   └── books.js              # Initial seed dataset
            ├── pages/
            │   └── Dashboard.jsx         # Main application controller & state
            └── components/
                ├── BookCard.jsx          # Book item display card
                ├── BookForm.jsx          # Add & Edit modal form
                ├── BookList.jsx          # Grid container for book cards
                ├── CategoryFilter.jsx    # Category select dropdown
                ├── DeleteConfirmation.jsx# Deletion modal dialog
                ├── EmptyState.jsx        # Fallback when no results found
                ├── Header.jsx            # Top banner & date
                ├── SearchBar.jsx         # Keyword search input
                ├── Sidebar.jsx           # Side navigation drawer
                └── StatCard.jsx          # Metric statistic indicator
```

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Feather Icons `react-icons/fi`)
- **Styling**: Modern Pure CSS with CSS custom properties and Flexbox/Grid
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/panchalashik6-cmyk/booklibrary.git
   cd booklibrary
   ```

2. **Navigate to the React application:**
   ```bash
   cd librarybook/my-react-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Open the URL printed in the terminal (typically `http://localhost:5173`) to view BookNest.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
