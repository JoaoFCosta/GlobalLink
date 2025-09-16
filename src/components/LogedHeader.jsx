import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const LogedHeader = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="d-flex fs-4 justify-content-end me-3 mt-3 align-items-center">
      <i
        className="bi bi-sun me-2"
        style={{ color: darkMode ? "#ffffff" : "#000000" }}
      ></i>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={darkMode}
          onChange={toggleTheme}
          aria-label="Alternar tema"
        />
      </div>
      <i
        className="bi bi-moon"
        style={{ color: darkMode ? "#ffffff" : "#000000" }}
      ></i>
    </div>
  );
};

export default LogedHeader;