import React from "react";
import "../Header/Header.scss";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Sauvegarder la langue dans localStorage
  };

  return (
    <div id="card-header" className="header">
      <div className="brandbar-header">
        <span className="brandbar-info">
          CISBYLHYAF TLECIQ - 26626656 - DERNIÈRE CONNEXION LE 12/12/2024 À
          08:49:20
        </span>
      </div>
      <nav className="navbar-box" role="navigation">
        <a href="#" className="navbar-brand">
          <img
            src="/images/logo-bnp.svg"
            className="d-inline-block align-top mr-2"
            alt="BNP Paribas"
          />
          <span className="header-logo">Ma Banque Entreprise</span>
        </a>

        {/* Language selection */}
        <div className="flex list-none items-center space-x-6 mr-5">
          <a
            onClick={() => changeLanguage("en")}
            style={{
              cursor: "pointer",
              color: "#009562",
              fontFamily: "Roboto",
            }}
            title="English"
          >
            en
          </a>
          <a
            onClick={() => changeLanguage("fr")}
            style={{
              cursor: "pointer",
              color: "#009562",
              fontFamily: "Roboto",
            }}
            title="Français"
          >
            fr
          </a>
          {/* Logout button */}
          <div className="logout">
            <a
              to="/logout" // Assuming you handle logout route in your application
            >
              <img
                title="Deconnexion"
                src="/images/deconnexion.png"
                className="d-inline-block align-top logout-icon"
                alt="Deconnexion"
              />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
