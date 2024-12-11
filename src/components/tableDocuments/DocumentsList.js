import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; // Import the hook
import PeriodPipe from '../../pipes/periode.pipe';
import Tag from '../libs/TagType';
import './DocumentsList.scss';
const DocumentsList = ({ data, loading, error }) => {
  const { t, i18n } = useTranslation(); // Initialize the translation hook
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [expandedDoc, setExpandedDoc] = useState(null); // State to track the expanded row

  // Function to handle checkbox state changes
  const handleCheckboxChange = (docId) => {
    setSelectedDocs((prevSelectedDocs) => {
      if (prevSelectedDocs.includes(docId)) {
        return prevSelectedDocs.filter((id) => id !== docId); // Deselect
      } else {
        return [...prevSelectedDocs, docId]; // Select
      }
    });
  };

  // Function to handle chevron click and toggle details
  const toggleDetails = (docId) => {
    setExpandedDoc((prevExpandedDoc) => (prevExpandedDoc === docId ? null : docId)); // Toggle visibility of details
  };

  return (
    <div className="table-list">
      {/* Show loading spinner */}
      {loading && <p>Chargement... <span className="spinner"></span></p>}

      {/* Show error message */}
      {error && <p style={{ color: 'red', padding: '10px', marginBottom: '15px' }}>{error}</p>}

      <table className="table table-striped" aria-live="polite">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDocs(data.map((doc) => doc.id)); // Select all
                  } else {
                    setSelectedDocs([]); // Deselect all
                  }
                }}
                checked={selectedDocs.length === data.length}
              />
            </th>
            <th>Date</th>
            <th>Compte</th>
            <th>Période</th>
            <th>Devise</th>
            <th>Type</th> {/* Added Type column header */}
            <th>Actions</th> {/* Actions column */}
            <th style={{ width: '5%' }}>Détail</th>
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
                  <td>{doc.firstConsultationDate}</td>
                  <td><span class="d-flex">{doc.label}</span>{doc.contractNumber}</td>
                  <td><PeriodPipe periodCode={doc.documentPeriodicity} /></td>
                  <td>{doc.devise}</td>
                  <td>
                  <Tag type="default" color="#008565">Primary Tag</Tag>
                    {/*

                   <Tag type="default" color="#008565">Primary Tag</Tag>
                      <Tag type="default" color="#4b2fb6">Primary Tag</Tag>
                      <Tag type="default" color="#972e0d">Primary Tag</Tag>
                      <Tag type="default" color="#007cb1">Primary Tag</Tag>

                  */}   

                    </td> {/* Added Type column data */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16" style={{ fill: '#aea7a7', height: '20px', width: '20px', cursor: 'pointer', marginRight: '15px' }}>
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                        <path d="M8 11.5A3.5 3.5 0 1 0 8 4.5a3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16" style={{ fill: 'green', height: '20px', width: '20px', cursor: 'pointer' }}>
                        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1c2.355 0 4.283-1.94 4.283-4.283A4.283 4.283 0 0 0 8 4.433a4.283 4.283 0 0 0-4.283 4.284C3.717 11.06 5.645 13 8 13z" />
                        <path fillRule="evenodd" d="M5.854 6.854a.5.5 0 0 1 .708 0L8 8.293l1.438-1.438a.5.5 0 1 1 .708.707l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.707z" />
                      </svg>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', width: '5%' }}>
                    {/* Chevron icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16" style={{ fill: '#aea7a7', height: '20px', width: '20px', cursor: 'pointer' }} onClick={() => toggleDetails(doc.id)}>
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </td>

                </tr>
                {expandedDoc === doc.id && (
                  <tr>
                    <td colSpan="8">
                      <div className="row-details">
                        <p><strong>Document Detail:</strong></p>
                        <p>{t('document.details')} for {doc.label} ({doc.contractNumber})</p>
                        <p><strong>Additional Info:</strong> {doc.additionalInfo || 'No additional info available.'}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>{t('filter.noDocuments')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsList;
