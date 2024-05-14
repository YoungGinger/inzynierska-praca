import React, { useState } from "react";
import "./loginForm.css";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("login succesfuly:", data);
        navigate("/Home");
      } else {
        console.error("Failed to login:", data);
        setError("Nieprawidłowa nazwa użytkownika lub hasło");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Błąd sieci. Spróbuj ponownie później");
    }
  };

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="form-content">
        <h2>Zaloguj się</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Hasło:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Zaloguj się</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
