import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../img/logo_v1.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Dodanie stanu dla menu hamburger

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Funkcja do przełączania menu
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} className="club_logo" alt="Logo Klubu" />
        </Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <nav className={isOpen ? "nav open" : "nav"}>
        <ul>
          <li>
            <Link to="/dashboard">Panel</Link>
          </li>
          <li>
            <Link to="/team">Drużyna</Link>
          </li>
          <li>
            <Link to="/schedule">Harmonogram</Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <button>Wyloguj</button>
      </div>
    </header>
  );
};

export default Header;
