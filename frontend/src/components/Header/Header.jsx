import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../img/logo_v1.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Dodaj stan dla isOpen
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
        {userData && (
          <>
            <span>{userData.username}</span>
            <button onClick={handleLogout}>Wyloguj</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
