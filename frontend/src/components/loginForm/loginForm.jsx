import React, { useState } from "react";
import "./loginForm.css";
import logo from "../../img/logo.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://adres-twojego-backendu/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data); // Możesz obsłużyć odpowiedź backendu tutaj, np. wyświetlić komunikat dla użytkownika
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania logowania:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="form-content">
        <h2>Zaloguj się</h2>
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
