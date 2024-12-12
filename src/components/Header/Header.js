import React from "react";
import { Link } from "react-router-dom"; // Ensure you're using React Router for Link
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
        <div className="language-selection">
          <Link
            onClick={() => changeLanguage("en")}
            style={{ cursor: "pointer", fontSize: "24px", marginRight: "10px" }}
            title="English"
          >
            🇺🇸
          </Link>
          <Link
            onClick={() => changeLanguage("fr")}
            style={{ cursor: "pointer", fontSize: "24px" }}
            title="Français"
          >
            🇫🇷
          </Link>
        </div>

        {/* Logout button */}
        <div className="logout">
          <Link
            to="/logout" // Assuming you handle logout route in your application
            style={{
              color: "red",
              fontSize: "24px",
              cursor: "pointer",
              marginLeft: "20px",
            }}
            title="Deconnexion"
          >
            🔓
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
