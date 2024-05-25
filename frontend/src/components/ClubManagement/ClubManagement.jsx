import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./ClubManagement.css";

const ClubManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/employees/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/events/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEmployees();
    fetchEvents();
  }, []);

  return (
    <div>
      <Header userRole="president" />
      <div className="club-management-page">
        <h2>Zarządzanie Klubem</h2>
        <div className="employees-section">
          <h3>Pracownicy Klubu</h3>
          <table className="employees-table">
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Stanowisko</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="events-section">
          <h3>Wydarzenia Klubowe</h3>
          <table className="events-table">
            <thead>
              <tr>
                <th>Nazwa wydarzenia</th>
                <th>Data</th>
                <th>Opis</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClubManagement;
