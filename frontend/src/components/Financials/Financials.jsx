import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Financials.css";

const Financials = () => {
  const [finances, setFinances] = useState([]);
  const [playerSalaries, setPlayerSalaries] = useState([]);
  const [coachSalaries, setCoachSalaries] = useState([]);
  const [editingSalary, setEditingSalary] = useState(null);
  const [newSalary, setNewSalary] = useState("");

  useEffect(() => {
    const fetchFinances = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/financials/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setFinances(data);
      } catch (error) {
        console.error("Error fetching finances:", error);
      }
    };

    const fetchPlayerSalaries = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/players/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setPlayerSalaries(data);
      } catch (error) {
        console.error("Error fetching player salaries:", error);
      }
    };

    const fetchCoachSalaries = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/coaches/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setCoachSalaries(data);
      } catch (error) {
        console.error("Error fetching coach salaries:", error);
      }
    };

    fetchFinances();
    fetchPlayerSalaries();
    fetchCoachSalaries();
  }, []);

  const handleEditSalary = (userId, currentSalary) => {
    setEditingSalary(userId);
    setNewSalary(currentSalary);
  };

  const handleSalaryChange = (e) => {
    setNewSalary(e.target.value);
  };

  const handleSalarySubmit = async (userId, userType) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user-salaries/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ salary: newSalary }),
        }
      );
      if (response.ok) {
        if (userType === "player") {
          setPlayerSalaries((prevSalaries) =>
            prevSalaries.map((user) =>
              user.id === userId ? { ...user, salary: newSalary } : user
            )
          );
        } else if (userType === "coach") {
          setCoachSalaries((prevSalaries) =>
            prevSalaries.map((user) =>
              user.id === userId ? { ...user, salary: newSalary } : user
            )
          );
        }
        setEditingSalary(null);
        setNewSalary("");
      } else {
        console.error("Error updating salary");
      }
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  return (
    <div>
      <Header userRole="president" />
      <div className="financials-page">
        <h2>Finanse Klubu</h2>
        <div className="finances-table">
          <table>
            <thead>
              <tr>
                <th>Typ</th>
                <th>Kwota</th>
                <th>Data</th>
                <th>Opis</th>
              </tr>
            </thead>
            <tbody>
              {finances.map((finance) => (
                <tr key={finance.id}>
                  <td>{finance.type === "income" ? "Przychód" : "Wydatek"}</td>
                  <td>{finance.amount}</td>
                  <td>{new Date(finance.date).toLocaleDateString()}</td>
                  <td>{finance.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>Zarobki Zawodników</h2>
        <div className="player-salaries-table">
          <table>
            <thead>
              <tr>
                <th>Nazwa Zawodnika</th>
                <th>Pozycja</th>
                <th>Wynagrodzenie</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {playerSalaries.map((player) => (
                <tr key={player.id}>
                  <td>{player.username}</td>
                  <td>{player.position}</td>
                  <td>
                    {editingSalary === player.id ? (
                      <input
                        type="number"
                        value={newSalary}
                        onChange={handleSalaryChange}
                      />
                    ) : (
                      player.salary
                    )}
                  </td>
                  <td>
                    {editingSalary === player.id ? (
                      <button
                        onClick={() => handleSalarySubmit(player.id, "player")}
                      >
                        Zapisz
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEditSalary(player.id, player.salary)
                        }
                      >
                        Edytuj
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>Zarobki Trenerów</h2>
        <div className="coach-salaries-table">
          <table>
            <thead>
              <tr>
                <th>Nazwa Trenera</th>
                <th>Pozycja</th>
                <th>Wynagrodzenie</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {coachSalaries.map((coach) => (
                <tr key={coach.id}>
                  <td>{coach.username}</td>
                  <td>{coach.position}</td>
                  <td>
                    {editingSalary === coach.id ? (
                      <input
                        type="number"
                        value={newSalary}
                        onChange={handleSalaryChange}
                      />
                    ) : (
                      coach.salary
                    )}
                  </td>
                  <td>
                    {editingSalary === coach.id ? (
                      <button
                        onClick={() => handleSalarySubmit(coach.id, "coach")}
                      >
                        Zapisz
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditSalary(coach.id, coach.salary)}
                      >
                        Edytuj
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financials;
