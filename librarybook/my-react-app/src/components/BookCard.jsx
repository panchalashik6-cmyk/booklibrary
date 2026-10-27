
import {
  FiBookOpen,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiUser,
  FiTag,
} from "react-icons/fi";

function BookCard(props) {
  const book = props.book;

  const onEdit = props.onEdit;
  const onDelete = props.onDelete;
  const onToggleStatus = props.onToggleStatus;

  // book available hai ya nhi check karna 
  let isAvailable = false;

  if (book.status === "Available") {
    isAvailable = true;
  }

  return (
    <div className="book-card">

    
      <div className="book-card-header">

        <div className="book-card-icon">
          <FiBookOpen />
        </div>

        <span
          className={
            isAvailable
              ? "book-status status-available"
              : "book-status status-issued"
          }
        >
          <span className="status-dot"></span>

          {book.status}
        </span>

      </div>

      <div className="book-card-body">

      
        <p className="book-card-category">
          {book.category}
        </p>

        <h3 className="book-card-title">
          {book.title}
        </h3>

        <div className="book-card-author">

          <FiUser />

          <span>
            {book.author}
          </span>

        </div>

    
        <div className="book-card-category-info">

          <FiTag />

          <span>
            {book.category}
          </span>

        </div>

      </div>

      
      <div className="book-card-footer">

       
        <button
          type="button"
          className="book-action-button status-action"
          onClick={() => onToggleStatus(book.id)}
          title="Change book status"
        >

          <FiRefreshCw />

          <span>
            {isAvailable ? "Issue Book" : "Return Book"}
          </span>

        </button>

        <div className="book-card-actions">

      
          <button
            type="button"
            className="icon-action-button edit-action"
            onClick={() => onEdit(book)}
            title="Edit book"
            aria-label={`Edit ${book.title}`}
          >
            <FiEdit2 />
          </button>

          <button
            type="button"
            className="icon-action-button delete-action"
            onClick={() => onDelete(book.id)}
            title="Delete book"
            aria-label={`Delete ${book.title}`}
          >
            <FiTrash2 />
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookCard;




