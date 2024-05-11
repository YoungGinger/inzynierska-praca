import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import LoginForm from "./components/loginForm/loginForm.jsx";

function App() {
  return (
    <Router>
      <div>
        <LoginForm />
        {/* Inne komponenty lub Routery tutaj */}
      </div>
    </Router>
  );
}

export default App;
