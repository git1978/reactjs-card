import React, { useState } from "react";
import "../Menu/Menu.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

const Menu = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className="sidebar">
      <h4 className="text-center py-3">Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/" className="nav-link">
            E-Cards<i className="bi bi-chevron-right ms-auto"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="#section2" className="nav-link" onClick={toggleSubMenu}>
            E-Documents{" "}
            <i
              className={`bi bi-chevron-${
                isSubMenuOpen ? "down" : "right"
              } ms-auto`}
            ></i>
          </a>
          {isSubMenuOpen && (
            <div id="submenu2" className="submenu">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a href="filter" className="nav-link">
                    Relevés & factures
                  </a>
                </li>
                <li className="nav-item">
                  <a href="copim" className="nav-link">
                    Justificatif d&apos;identité
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#subsection3" className="nav-link">
                    Documents à signer
                  </a>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className="nav-item">
          <a href="#section3" className="nav-link">
            Administration <i className="bi bi-chevron-right ms-auto"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
