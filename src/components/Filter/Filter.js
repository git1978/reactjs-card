import React, { useState } from "react";

const Filter = () => {
  const [filters, setFilters] = useState({
    typeDocument: "",
    date: "",
    compte: "",
    periode: "",
    devise: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filtres appliqués :", filters);
  };

  const handleReset = () => {
    setFilters({
      typeDocument: "",
      date: "",
      compte: "",
      periode: "",
      devise: "",
    });
  };

  return (
    <>
      <div className="mt-4">
        <h3 className="mb-4">Filtres de Recherche</h3>
        <form onSubmit={handleSubmit}>
          {/* Première ligne : Types de documents */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="typeDocument" className="form-label">
                Type de Document
              </label>
              <select
                className="form-select"
                id="typeDocument"
                name="typeDocument"
                value={filters.typeDocument}
                onChange={handleChange}
              >
                <option value="">Tous</option>
                <option value="facture">Facture</option>
                <option value="caution">Caution</option>
                <option value="contrat">Contrat</option>
              </select>
            </div>
          </div>

          {/* Deuxième ligne : Date, Compte, Période, Devise */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={filters.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="compte" className="form-label">
                Compte
              </label>
              <select
                className="form-select"
                id="compte"
                name="compte"
                value={filters.compte}
                onChange={handleChange}
              >
                <option value="">Tous</option>
                <option value="FR1212341234123412341234123">🇫🇷 FR1212341234123412341234123</option>
                <option value="MA1212341234123412341234123">🇲🇦 MA1212341234123412341234123</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="periode" className="form-label">
                Période
              </label>
              <select
                className="form-select"
                id="periode"
                name="periode"
                value={filters.periode}
                onChange={handleChange}
              >
                <option value="">Toutes</option>
                <option value="janvier">Janvier</option>
                <option value="fevrier">Février</option>
                <option value="mars">Mars</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="devise" className="form-label">
                Devise
              </label>
              <select
                className="form-select"
                id="devise"
                name="devise"
                value={filters.devise}
                onChange={handleChange}
              >
                <option value="">Toutes</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="mad">MAD</option>
              </select>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary me-2">
                Filtrer
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Filter;
