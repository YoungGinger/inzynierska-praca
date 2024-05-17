import React, { useState } from "react";
import "./loginForm.css";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        console.log("Login successful:", data);

        localStorage.setItem("token", data.token);

        const user = data.user;
        if (!user) {
          throw new Error("Brak danych użytkownika w odpowiedzi.");
        }
        console.log("User role:", user);

        if (user.is_player) {
          navigate("/PlayerHome");
        } else if (user.is_coach) {
          navigate("/CoachHome");
        } else if (user.is_president) {
          navigate("/PresidentHome");
        } else {
          navigate("/home");
        }
      } else {
        setError("Failed to login. Please check your credentials.");
        console.error("Failed to login:", data);
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Network error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="form-content">
        <h2>Zaloguj się</h2>
        {error && <p className="error-message">{error}</p>}
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
