// src/Footer.js
import React from "react";
import "./Footer.scss"; // Add your CSS for footer here

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
