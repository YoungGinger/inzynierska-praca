import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/loginForm/loginForm";
import CoachHome from "./components/CoachHome/CoachHome";
import PlayerHome from "./components/PlayerHome/PlayerHome";
import PresidentHome from "./components/PresidentHome/PresidentHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/PresidentHome" element={<PresidentHome />} />
        <Route path="/CoachHome" element={<CoachHome />} />
        <Route path="/PlayerHome" element={<PlayerHome />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
