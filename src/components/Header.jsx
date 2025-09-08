import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  return (
    <div className="d-flex fs-4 justify-content-end me-3 mt-3 align-items-center">
      <i className="bi bi-sun me-2" style={{ color: darkMode ? "#ffffff" : "#000000" }}></i>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={darkMode}
          onChange={() => setDarkMode((prev) => !prev)}
          aria-label="Alternar tema"
        />
      </div>
      <i className="bi bi-moon ms-2" style={{ color: darkMode ? "#ffffff" : "#000000" }}></i>
    </div>
  );
};

export default Header;
