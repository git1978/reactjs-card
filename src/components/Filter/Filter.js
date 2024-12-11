import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
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
    };

    // Dispatch the form submission action
    dispatch(submitFormService(formData));
  };

  // Effect to reset the period if the document type is changed to 'facture'
  useEffect(() => {
    if (documentType === "facture") {
      setPeriod(""); // Reset the period if the document type is 'facture'
    }
  }, [documentType]);

  return (
    <div className="main">
      <div className="filter">
        <div className="main-liste">
          <form onSubmit={handleSubmit}>
            {/* Type de document */}
            <div className="row justify-content-center mb-3">
              <div className="col-12 col-md-6 text-center">
                <label htmlFor="documentType" className="form-label">
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
                  isSearchable={true} // Enables searching
                  className="react-select-container"
                />
              </div>
            </div>

            {/* Date Range Picker, Liste des Comptes, Période et Liste des Devises */}
            <div className="row justify-content-center mb-3">
              {/* Date Range */}
              <div className="col-12 col-md-3">
                <label htmlFor="dateRangePicker" className="form-label">
                  {t("filter.plagedate")}
                </label>
                <DatePicker
                  selected={dateRange[0]}
                  onChange={(dates) => setDateRange(dates)}
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  selectsRange
                  className="form-control"
                  placeholderText="Sélectionnez une plage de dates"
                  dateFormat="MM/dd/yyyy" // Changed date format to MM/dd/yyyy
                  locale="fr"
                />
              </div>

              {/* Liste des Comptes */}
              <div className="col-12 col-md-3">
                <label htmlFor="accountList" className="form-label">
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

              {/* Liste des Devises (Currency List) */}
              <div className="col-12 col-md-3">
                <label htmlFor="currencyList" className="form-label">
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

              {/* Période conditionnelle */}
              {documentType !== "facture" && (
                <div className="col-12 col-md-3">
                  <label htmlFor="periodList" className="form-label">
                    Période
                  </label>
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
                </div>
              )}
            </div>

            {/* Chips Bar */}
            <div
              id="chips"
              className="mt-4 p-2 d-flex flex-wrap align-items-center"
            >
              {dateRange[0] && dateRange[1] && (
                <span className="badge bg-success me-2 d-flex align-items-center">
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
                <span className="badge bg-info text-dark me-2 d-flex align-items-center">
                  Devise: {currency}
                  <FaTimes
                    onClick={() => handleDeleteChip("currency")}
                    className="ms-2 cursor-pointer"
                    style={{ color: "white" }}
                  />
                </span>
              )}
            </div>
            <Button
              event={handleSubmit}
              libelle={t("filter.searchbtn")}
              className="btn btn-outline-success float-right filter-submit"
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
