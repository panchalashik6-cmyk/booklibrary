
import { useState } from "react";

import {
  FiX,
  FiBookOpen,
} from "react-icons/fi";

function BookForm(props) {
  // Parent component se data aur functions lena
  const selectedBook = props.selectedBook;
  const onSave = props.onSave;
  const onCancel = props.onCancel;

  // Book ki initial values set karna
  const [title, setTitle] = useState(
    selectedBook ? selectedBook.title : ""
  );

  const [author, setAuthor] = useState(
    selectedBook ? selectedBook.author : ""
  );

  const [category, setCategory] = useState(
    selectedBook ? selectedBook.category : ""
  );

  const [status, setStatus] = useState(
    selectedBook ? selectedBook.status : "Available"
  );

  // Form errors store karna
  const [errors, setErrors] = useState({});

  // Check karna ki book edit ho rahi hai ya add
  const isEditing = Boolean(selectedBook);

  // Title input change hone par
  const handleTitleChange = (event) => {
    setTitle(event.target.value);

    if (errors.title) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        title: "",
      }));
    }
  };

  // Author input change hone par
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);

    if (errors.author) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        author: "",
      }));
    }
  };

  // Category change hone par
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);

    if (errors.category) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        category: "",
      }));
    }
  };

  // Status change hone par
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Form submit hone par
  const handleSubmit = (event) => {
    // Page reload hone se rokna
    event.preventDefault();

    // Shuru mein errors empty rakhna
    const newErrors = {};

    // Title validation
    if (title.trim() === "") {
      newErrors.title = "Book title is required";
    }

    // Author validation
    if (author.trim() === "") {
      newErrors.author = "Author name is required";
    }

    // Category validation
    if (category === "") {
      newErrors.category = "Please select a category";
    }

    // Errors update karna
    setErrors(newErrors);

    // Errors hain to form submit nahi karna
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Book ki details ka object banana
    const bookData = {
      title: title.trim(),
      author: author.trim(),
      category: category,
      status: status,
    };

    // Parent component ko book data bhejna
    onSave(bookData);
  };

  return (
    <div className="book-form-overlay">

      <div
        className="book-form-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-form-title"
      >

        {/* Form Header */}
        <div className="book-form-header">

          <div className="book-form-heading">

            <div className="book-form-icon">
              <FiBookOpen />
            </div>

            <div>

              <h2 id="book-form-title">
                {isEditing ? "Edit Book" : "Add New Book"}
              </h2>

              <p>
                {isEditing
                  ? "Update the details of your book."
                  : "Enter the details to add a new book."}
              </p>

            </div>

          </div>

          {/* Close Button */}
          <button
            type="button"
            className="book-form-close"
            onClick={onCancel}
            aria-label="Close form"
          >
            <FiX />
          </button>

        </div>

        {/* Book Form */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Book Title */}
          <div className="form-group">

            <label htmlFor="book-title">
              Book Title <span className="required-star">*</span>
            </label>

            <input
              id="book-title"
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={handleTitleChange}
              className={errors.title ? "input-error" : ""}
            />

            {errors.title && (
              <p className="form-error">
                {errors.title}
              </p>
            )}

          </div>

          {/* Author Name */}
          <div className="form-group">

            <label htmlFor="book-author">
              Author Name <span className="required-star">*</span>
            </label>

            <input
              id="book-author"
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={handleAuthorChange}
              className={errors.author ? "input-error" : ""}
            />

            {errors.author && (
              <p className="form-error">
                {errors.author}
              </p>
            )}

          </div>

          {/* Category */}
          <div className="form-group">

            <label htmlFor="book-category">
              Category <span className="required-star">*</span>
            </label>

            <select
              id="book-category"
              value={category}
              onChange={handleCategoryChange}
              className={errors.category ? "input-error" : ""}
            >

              <option value="">
                Select a category
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="Finance">
                Finance
              </option>

              <option value="Fiction">
                Fiction
              </option>

              <option value="Self Development">
                Self Development
              </option>

              <option value="Education">
                Education
              </option>

              <option value="History">
                History
              </option>

              <option value="Science">
                Science
              </option>

              <option value="Hindi Literature">
                Hindi Literature
              </option>

              <option value="Hindi Novel">
                Hindi Novel
              </option>

              <option value="Hindi Poetry">
                Hindi Poetry
              </option>

              <option value="Gujarati Literature">
                Gujarati Literature
              </option>

              <option value="Gujarati Novel">
                Gujarati Novel
              </option>

            </select>

            {errors.category && (
              <p className="form-error">
                {errors.category}
              </p>
            )}

          </div>

          {/* Book Status */}
          <div className="form-group">

            <label htmlFor="book-status">
              Book Status
            </label>

            <select
              id="book-status"
              value={status}
              onChange={handleStatusChange}
            >

              <option value="Available">
                Available
              </option>

              <option value="Issued">
                Issued
              </option>

            </select>

          </div>

          {/* Form Buttons */}
          <div className="book-form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-book-button"
            >
              {isEditing ? "Save Changes" : "Add Book"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BookForm;
