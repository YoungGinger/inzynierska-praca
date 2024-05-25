import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../img/logo_v1.png";
import profileIcon from "../../img/profile.svg";

const Header = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/home">
          <img src={logo} className="club_logo" alt="Logo Klubu" />
        </Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <nav className={isOpen ? "nav open" : "nav"}>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          {userRole === "player" && (
            <>
              <li>
                <Link to="/schedule">Harmonogram</Link>
              </li>
              <li>
                <Link to="/achievements">Osiągnięcia</Link>
              </li>
            </>
          )}
          {userRole === "coach" && (
            <>
              <li>
                <Link to="/team-management">Zarządzanie drużyną</Link>
              </li>
              <li>
                <Link to="/training-schedule">Harmonogram treningów</Link>
              </li>
            </>
          )}
          {userRole === "president" && (
            <>
              <li>
                <Link to="/financials">Finanse</Link>
              </li>
              <li>
                <Link to="/club-management">Zarządzanie klubem</Link>
              </li>
              <li>
                <Link to="/team-management">Zarządzanie zawodnikami</Link>
              </li>
              <li>
                <Link to="/schedule">Harmonogram</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="profile">
        <img
          src={profileIcon}
          className="profile-icon"
          alt="Profile"
          onClick={toggleProfileMenu}
        />
        {profileMenuOpen && (
          <div className="profile-menu">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Wyloguj
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
