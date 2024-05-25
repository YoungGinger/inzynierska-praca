import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/loginForm/loginForm";
import HomePage from "./components/HomePage/HomePage";
import Achievements from "./components/Achievements/Achievements";
import Schedule from "./components/Schedule/Schedule";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Financials from "./components/Financials/Financials";
import TeamManagement from "./components/TeamManagement/TeamManagement";
import TrainingSchedule from "./components/TrainingSchedule/TrainingSchedule";
import ClubManagement from "./components/ClubManagement/ClubManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financials"
          element={
            <ProtectedRoute>
              <Financials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club-management"
          element={
            <ProtectedRoute>
              <ClubManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-management"
          element={
            <ProtectedRoute>
              <TeamManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/training-schedule"
          element={
            <ProtectedRoute>
              <TrainingSchedule />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
