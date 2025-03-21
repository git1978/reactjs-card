import "../Modal/iaModel.scss";
const IaModal = ({ open, onClose, document }) => {
  if (!open) return null; // Only render when `open` is true

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h2>
            <span className="modal-icon">📄</span> Document Details
          </h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p>
            <strong>Label:</strong> {document.label}
          </p>
          <p>
            <strong>Contract Number:</strong> {document.contractNumber}
          </p>
          <p>
            <strong>Additional Info:</strong>{" "}
            {document.additionalInfo || "No additional info available."}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="modal-action" onClick={onClose}>
            Close
          </button>
          <button className="modal-secondary-action">Download</button>
        </div>
      </div>
    </div>
  );
};

export default IaModal;
