
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

function DeleteConfirmation({ book, onConfirm, onCancel }) {
  if (!book) {
    return null;
  }

  return (
    <div
      className="delete-confirmation-overlay"
      onClick={onCancel}
    >
      <div
        className="delete-confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirmation-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="delete-confirmation-close"
          onClick={onCancel}
          aria-label="Close confirmation"
        >
          <FiX />
        </button>

        <div className="delete-confirmation-icon">
          <FiAlertTriangle />
        </div>

        <h2 id="delete-confirmation-title">Delete this book?</h2>

        <p className="delete-confirmation-message">
          Are you sure you want to delete{" "}
          <strong>{book.title}</strong>?
          This action cannot be undone.
        </p>

        <div className="delete-confirmation-actions">
          <button
            type="button"
            className="cancel-delete-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-button"
            onClick={() => onConfirm(book.id)}
          >
            <FiTrash2 />
            <span>Delete Book</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;