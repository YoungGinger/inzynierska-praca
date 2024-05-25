import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TrainingSchedule.css";
import Header from "../Header/Header";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const TrainingSchedule = () => {
  const [trainings, setTrainings] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    player_ids: [],
  });
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchTrainings = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/trainings/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    const fetchMatches = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/match-schedule/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    const fetchTeams = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/teams/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    const fetchPlayers = async () => {
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
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    const fetchUserRole = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserRole(user.role);
    };

    fetchTrainings();
    fetchMatches();
    fetchTeams();
    fetchPlayers();
    fetchUserRole();
  }, []);

  const handleDateChange = (date) => {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    setSelectedDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: localDate,
    }));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => {
        const player_ids = checked
          ? [...prevFormData.player_ids, parseInt(value)]
          : prevFormData.player_ids.filter((id) => id !== parseInt(value));
        return { ...prevFormData, player_ids };
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/trainings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setTrainings((prevTrainings) => [...prevTrainings, data]);
      } else {
        console.error("Error adding training:", data);
      }
    } catch (error) {
      console.error("Error adding training:", error);
    }
  };

  const handleDelete = async (trainingId) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://127.0.0.1:8000/api/trainings/${trainingId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      setTrainings((prevTrainings) =>
        prevTrainings.filter((training) => training.id !== trainingId)
      );
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  const filteredTrainings = trainings.filter(
    (training) =>
      new Date(training.date).toDateString() === selectedDate.toDateString()
  );

  const filteredMatches = matches.filter(
    (match) =>
      new Date(match.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
      <Header userRole={userRole} />
      <div className="training-schedule-page">
        <h2>Harmonogram Treningów</h2>
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateChange}
            value={selectedDate}
            locale="pl"
            showNeighboringMonth={false}
            tileContent={({ date }) => {
              const events = trainings.filter(
                (event) =>
                  new Date(event.date).toDateString() === date.toDateString()
              );
              return events.length > 0 ? <div className="highlight" /> : null;
            }}
          />
        </div>
        <div className="training-details">
          <h3>
            Treningi w dniu{" "}
            {format(selectedDate, "EEEE, d MMMM yyyy", { locale: pl })}
          </h3>
          {filteredTrainings.length > 0 ? (
            filteredTrainings.map((training) => (
              <div key={training.id} className="training-card">
                <h4>{training.title}</h4>
                <p>{training.description}</p>
                <p>
                  Zawodnicy:{" "}
                  {training.players.map((player) => player.username).join(", ")}
                </p>
                <button onClick={() => handleDelete(training.id)}>Usuń</button>
              </div>
            ))
          ) : (
            <p>Brak treningów na ten dzień</p>
          )}
        </div>
        <form className="training-form" onSubmit={handleFormSubmit}>
          <h3>Dodaj Trening</h3>
          <p>
            Data treningu:{" "}
            {format(selectedDate, "EEEE, d MMMM yyyy", { locale: pl })}
          </p>
          <input
            type="text"
            name="title"
            placeholder="Tytuł"
            value={formData.title}
            onChange={handleFormChange}
            required
          />
          <textarea
            name="description"
            placeholder="Opis"
            value={formData.description}
            onChange={handleFormChange}
            required
          />
          <div className="players-checkboxes">
            <h4>Wybierz Zawodników</h4>
            {players.map((player) => (
              <label key={player.id} className="player-checkbox">
                <input
                  type="checkbox"
                  name="player_ids"
                  value={player.id}
                  onChange={handleFormChange}
                />
                {player.username}
              </label>
            ))}
          </div>
          <button type="submit">Dodaj</button>
        </form>
        <h2>Harmonogram Meczów</h2>
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateChange}
            value={selectedDate}
            locale="pl"
            showNeighboringMonth={false}
            tileContent={({ date }) => {
              const events = matches.filter(
                (event) =>
                  new Date(event.date).toDateString() === date.toDateString()
              );
              return events.length > 0 ? <div className="highlight" /> : null;
            }}
          />
        </div>
        <div className="match-details">
          <h3>
            Mecze w dniu{" "}
            {format(selectedDate, "EEEE, d MMMM yyyy", { locale: pl })}
          </h3>
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <div key={match.id} className="match-card">
                <h4>{match.title}</h4>
                <p>{match.description}</p>
                <p>
                  Drużyny: {match.home_team.name} vs {match.away_team.name}
                </p>
              </div>
            ))
          ) : (
            <p>Brak meczów na ten dzień</p>
          )}
        </div>
        <h2>Tabela Ligowa</h2>
        <div className="table-responsive">
          <table className="teams-table">
            <thead>
              <tr>
                <th>Nazwa Drużyny</th>
                <th>Rozegrane Mecze</th>
                <th>Wygrane</th>
                <th>Przegrane</th>
                <th>Remisy</th>
                <th>Bramki</th>
                <th>Punkty</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td data-label="Nazwa Drużyny">{team.name}</td>
                  <td data-label="Rozegrane Mecze">{team.matches_played}</td>
                  <td data-label="Wygrane">{team.matches_won}</td>
                  <td data-label="Przegrane">{team.matches_lost}</td>
                  <td data-label="Remisy">{team.matches_drawn}</td>
                  <td data-label="Bramki">{team.goals_scored}</td>
                  <td data-label="Punkty">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainingSchedule;
