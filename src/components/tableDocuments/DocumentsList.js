import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PeriodPipe from "../../pipes/periode.pipe";
import Tag from "../libs/Tags/TagType";
import "./DocumentsList.scss";
import Modal from "../libs/Modal/iaModal";

const DocumentsList = ({ data, loading, error }) => {
  const { t } = useTranslation();
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleCheckboxChange = (docId) => {
    setSelectedDocs((prevSelectedDocs) =>
      prevSelectedDocs.includes(docId)
        ? prevSelectedDocs.filter((id) => id !== docId)
        : [...prevSelectedDocs, docId]
    );
  };

  const toggleDetails = (docId) => {
    setExpandedDoc((prevExpandedDoc) =>
      prevExpandedDoc === docId ? null : docId
    );
  };

  const openModal = (doc) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  const getTagColor = (bankStatementType) => {
    switch (bankStatementType) {
      case "F":
        return "#008565";
      case "Q":
        return "#4b2fb6";
      case "M":
        return "#972e0d";
      case "N":
        return "#007cb1";
      default:
        return "#cccccc"; // Default color if no match
    }
  };

  const getTagLabel = (bankStatementType) => {
    switch (bankStatementType) {
      case "F":
        return "F Type Tag";
      case "Q":
        return "Q Type Tag";
      case "M":
        return "M Type Tag";
      case "N":
        return "N Type Tag";
      default:
        return "Unknown Type";
    }
  };

  return (
    <div className="table-list">
      {loading && (
        <p>
          Chargement... <span className="spinner"></span>
        </p>
      )}

      {error && (
        <p style={{ color: "red", padding: "10px", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <table className="table table-striped" aria-live="polite">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDocs(data.map((doc) => doc.id));
                  } else {
                    setSelectedDocs([]);
                  }
                }}
                checked={selectedDocs.length === data.length}
              />
            </th>
            <th>Date</th>
            <th>Compte</th>
            <th>Période</th>
            <th>Devise</th>
            <th>Type</th>
            <th>Actions</th>
            <th style={{ width: "5%" }}>Détail</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((doc) => (
              <React.Fragment key={doc.id || doc.firstConsultationDate}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => handleCheckboxChange(doc.id)}
                    />
                  </td>
                  <td
                    onClick={() => openModal(doc)}
                    style={{ cursor: "pointer" }}
                  >
                    {doc.firstConsultationDate}
                  </td>
                  <td>
                    <span className="d-flex">{doc.label}</span>
                    {doc.contractNumber}
                  </td>
                  <td>
                    <PeriodPipe periodCode={doc.documentPeriodicity} />
                  </td>
                  <td>{doc.devise}</td>
                  <td>
                    <Tag
                      type="default"
                      color={getTagColor(doc.bankStatementType)}
                    >
                      {getTagLabel(doc.bankStatementType)}
                    </Tag>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                        style={{
                          fill: "#aea7a7",
                          height: "20px",
                          width: "20px",
                          cursor: "pointer",
                          marginRight: "15px",
                        }}
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                        <path d="M8 11.5A3.5 3.5 0 1 0 8 4.5a3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-down-circle"
                        viewBox="0 0 16 16"
                        style={{
                          fill: "green",
                          height: "20px",
                          width: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1c2.355 0 4.283-1.94 4.283-4.283A4.283 4.283 0 0 0 8 4.433a4.283 4.283 0 0 0-4.283 4.284C3.717 11.06 5.645 13 8 13z" />
                        <path
                          fillRule="evenodd"
                          d="M5.854 6.854a.5.5 0 0 1 .708 0L8 8.293l1.438-1.438a.5.5 0 1 1 .708.707l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.707z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td style={{ textAlign: "center", width: "5%" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                      style={{
                        fill: "#aea7a7",
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleDetails(doc.id)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </td>
                </tr>
                {expandedDoc === doc.id && (
                  <tr>
                    <td colSpan="8">
                      <div className="row-details">
                        <p>
                          <strong>Document Detail:</strong>
                        </p>
                        <p>
                          {t("document.details")} for {doc.label} (
                          {doc.contractNumber})
                        </p>
                        <p>
                          <strong>Additional Info:</strong>{" "}
                          {doc.additionalInfo ||
                            "No additional info available."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                {t("filter.noDocuments")}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* iaModal */}
      {modalOpen && selectedDoc && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          document={selectedDoc}
        />
      )}
    </div>
  );
};

export default DocumentsList;
