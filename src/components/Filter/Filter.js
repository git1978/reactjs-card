import React, { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "./Filter.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccounts,
  selectDevises,
  selectDocumentTypes,
} from "../../redux/selectors/documentSelector";
import DocumentsList from "../tableDocuments/DocumentsList";
import { submitFormService } from "../../redux/Slices/formSlice"; // Import the action from the renamed slice
import {
  selectDocuments,
  selectLoading,
  selectError,
} from "../../redux/selectors/formSelectors";
import Button from "../libs/button/iaButton";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(selectAccounts);
  const devises = useSelector(selectDevises);
  const documents = useSelector(selectDocuments);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const documentTypes = useSelector(selectDocumentTypes);

  const { t } = useTranslation();

  const [documentType, setDocumentType] = useState("");
  const [dateRange, setDateRange] = useState([new Date(), new Date()]); // Default to today
  const [account, setAccount] = useState("");
  const [period, setPeriod] = useState("");
  const [currency, setCurrency] = useState("");
  const [facture, setFacture] = useState("");

  const handleDeleteChip = (chipType) => {
    switch (chipType) {
      case "documentType":
        setDocumentType("");
        break;
      case "dateRange":
        setDateRange([new Date(), new Date()]); // Reset to today's date
        break;
      case "account":
        setAccount("");
        break;
      case "period":
        setPeriod("");
        break;
      case "currency":
        setCurrency(""); // Reset currency
        break;
      case "facture":
        setFacture(""); // Reset currency
        break;
      default:
        break;
    }
  };

  const accountOptions = accounts.map((acc) => ({
    value: acc.account,
    label: (
      <div className="account-option">
        <span>{acc.label}</span>
        <div className="account-details">
          <img
            src={`https://flagcdn.com/w40/${acc.account
              .substring(0, 2)
              .toLowerCase()}.png`}
            alt="Flag"
            className="flag-icon me-2"
          />
          {acc.account}
        </div>
      </div>
    ),
  }));

  const handleAccountChange = (selectedOption) => {
    setAccount(selectedOption ? selectedOption.value : "");
  };

  const handleSelectChange = (selectedOption) => {
    setDocumentType(selectedOption ? selectedOption.value : "");
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString("en-US") : ""; // Format MM/DD/YYYY
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      documentType,
      dateRange,
      account,
      period,
      currency,
      facture,
    };

    // Dispatch the form submission action
    dispatch(submitFormService(formData));
  };

  // Effect to reset the period if the document type is changed to 'facture'
  useEffect(() => {
    if (documentType === "fct") {
      setPeriod(""); // Reset the period if the document type is 'facture'
      setFacture(""); // Clear facture
      setCurrency("");
    }

    if (
      documentType !== "fct" &&
      documentType !== "rlv-com-cf" &&
      documentType !== "rlv-vi"
    ) {
      setPeriod(""); // Reset the period if the document type is 'facture'
      setFacture(""); // Clear facture
      setCurrency("");
    }
  }, [documentType]);

  return (
    <div className="main">
      <nav id="navbreadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Accueil</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>Relevés &amp; factures</span>
          </li>
        </ol>
      </nav>
      <h1 className="h1 title-edoc mt-3">E-Documents</h1>
      <div className="filter">
        <div className="main-liste">
          <form onSubmit={handleSubmit}>
            {/* First Row: Liste des Comptes */}
            <div className="row justify-content-start mb-3">
              <div className="col-12 col-md-6 d-flex align-items-center">
                <label htmlFor="accountList" className="sub-filtre">
                  Liste des Comptes
                </label>
                {loading ? (
                  <p>Chargement des comptes...</p>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : (
                  <Select
                    id="accountList"
                    options={accountOptions}
                    onChange={handleAccountChange}
                    placeholder="Choisir un compte..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
              </div>
            </div>

            {/* Second Row: Type de Document and Date Range on the same line */}
            <div className="row justify-content-start mb-3">
              <div className="col-12 col-md-6 d-flex align-items-center">
                <label htmlFor="documentType" className="sub-filtre">
                  {t("filter.typedoc")}
                </label>
                <Select
                  id="documentType"
                  value={
                    documentTypes
                      .flatMap((category) => category.options)
                      .find((option) => option.value === documentType) || null
                  }
                  onChange={handleSelectChange}
                  options={documentTypes}
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => e.value}
                  placeholder="Choisir un type..."
                  isSearchable={true}
                  className="react-select-container"
                />
              </div>
            </div>

            <div className="row justify-content-start mb-3">
              {/* Date Range Picker in the first column */}
              <div className="col-12 col-md-4">
                <label htmlFor="dateRangePicker" className="sub-filtre">
                  {t("filter.plagedate")}
                </label>
                <DatePicker
                  selected={dateRange[0]}
                  onChange={(dates) => setDateRange(dates)}
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  selectsRange
                  className="form-control rangeDate"
                  placeholderText="Sélectionnez une plage de dates"
                  dateFormat="MM/dd/yyyy"
                  locale="fr"
                />
              </div>

              {/* Liste des Devises */}
              {(documentType === "fct" ||
                documentType === "rlv-com-cf" ||
                documentType === "rlv-vi") && (
                <div className="col-12 col-md-4">
                  <label htmlFor="currencyList" className="sub-filtre">
                    Liste des Devises
                  </label>
                  {loading ? (
                    <p>Chargement des devises...</p>
                  ) : error ? (
                    <p className="text-danger">{error}</p>
                  ) : (
                    <select
                      id="currencyList"
                      className="form-select"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="">Choisir une devise...</option>
                      {devises &&
                        devises.map((devise, index) => (
                          <option key={index} value={devise.currency}>
                            {devise.currency} - {devise.country}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              )}

              {/* Liste des Devises */}
              {documentType !== "fct" &&
                documentType !== "rlv-com-cf" &&
                documentType !== "rlv-vi" && (
                  <div className="col-12 col-md-4">
                    <label htmlFor="periodList" className="sub-filtre">
                      Période
                    </label>
                    {loading ? (
                      <p>Chargement des devises...</p>
                    ) : error ? (
                      <p className="text-danger">{error}</p>
                    ) : (
                      <select
                        id="periodList"
                        className="form-select"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                      >
                        <option value="">Choisir une période...</option>
                        <option value="QUOTIDIEN">QUOTIDIEN</option>
                        <option value="HEBDOMADAIRE">HEBDOMADAIRE</option>
                        <option value="MENSUEL">MENSUEL</option>
                        <option value="BIMENSUEL">BIMENSUEL</option>
                        <option value="TRIMESTRIEL">TRIMESTRIEL</option>
                        <option value="SEMESTRIEL">SEMESTRIEL</option>
                        <option value="ANNUEL">ANNUEL</option>
                      </select>
                    )}
                  </div>
                )}

              {/* Numéro de Facture */}
              {(documentType === "fct" ||
                documentType === "rlv-com-cf" ||
                documentType === "rlv-vi") && (
                <div className="col-12 col-md-4" id="facture">
                  <label htmlFor="invoiceNumber" className="me-2">
                    Numéro de Facture:
                  </label>
                  <input
                    id="factureInput"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Entrer le numéro de facture"
                    value={facture} // Bind to the state variable
                    onChange={(e) => setFacture(e.target.value)} // Update state on input change
                  />
                </div>
              )}
            </div>

            {/* Chips Bar */}
            <div
              id="chips"
              className="mt-4 p-2 d-flex flex-wrap align-items-center"
            >
              {dateRange[0] && dateRange[1] && (
                <span className="badge bg-date me-2 d-flex align-items-center">
                  Dates: {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                  <FaTimes
                    onClick={() => handleDeleteChip("dateRange")}
                    className="ms-2 cursor-pointer"
                    style={{ color: "white" }}
                  />
                </span>
              )}
              {account && (
                <span className="badge bg-warning text-dark me-2 d-flex align-items-center">
                  Compte: {account}
                  <FaTimes
                    onClick={() => handleDeleteChip("account")}
                    className="ms-2 cursor-pointer"
                    style={{ color: "white" }}
                  />
                </span>
              )}
              {period && (
                <span className="badge bg-danger me-2 d-flex align-items-center">
                  Période: {period}
                  <FaTimes
                    onClick={() => handleDeleteChip("period")}
                    className="ms-2 cursor-pointer"
                    style={{ color: "white" }}
                  />
                </span>
              )}
              {currency && (
                <span className="badge bg-info me-2 d-flex align-items-center">
                  Devise: {currency}
                  <FaTimes
                    onClick={() => handleDeleteChip("currency")}
                    className="ms-2 cursor-pointer"
                    style={{ color: "white" }}
                  />
                </span>
              )}
              {facture && (
                <span className="badge bg-secondary me-2 d-flex align-items-center">
                  Numéro de Facture: {facture}
                  <FaTimes
                    onClick={() => handleDeleteChip("facture")}
                    className="ms-2 cursor-pointer"
                    style={{ color: "white" }}
                  />
                </span>
              )}
            </div>
            <Button
              event={handleSubmit}
              libelle={
                <>
                  <FaSearch className="me-2" /> {t("filter.searchbtn")}
                </>
              }
              className="float-right btn-green-reverse filter-submit"
              type="submit"
            />
          </form>
        </div>
      </div>
      {documents.length > 0 && (
        <div className="sub-content">
          <DocumentsList
            data={documents}
            loading={loading}
            error={error}
            t={t}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
