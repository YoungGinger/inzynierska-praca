import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Schedule.css";
import Header from "../Header/Header";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Tooltip } from "react-tooltip";

const Schedule = () => {
  const [trainingSchedule, setTrainingSchedule] = useState([]);
  const [matchSchedule, setMatchSchedule] = useState([]);
  const [teams, setTeams] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchSchedules = async () => {
      const token = localStorage.getItem("token");
      try {
        const responseTraining = await fetch(
          "http://127.0.0.1:8000/api/training-schedule/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const trainingData = await responseTraining.json();
        setTrainingSchedule(trainingData);

        const responseMatch = await fetch(
          "http://127.0.0.1:8000/api/match-schedule/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const matchData = await responseMatch.json();
        setMatchSchedule(matchData);

        const responseTeams = await fetch("http://127.0.0.1:8000/api/teams/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const teamsData = await responseTeams.json();
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user.role);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onTrainingDateClick = (date) => {
    const events = trainingSchedule.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
    alert(events.map((event) => event.title).join("\n"));
  };

  const onMatchDateClick = (date) => {
    const events = matchSchedule.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
    alert(events.map((event) => event.title).join("\n"));
  };

  const filteredTrainings = trainingSchedule.filter(
    (training) =>
      new Date(training.date).toDateString() === selectedDate.toDateString()
  );

  const filteredMatches = matchSchedule.filter(
    (match) =>
      new Date(match.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
      <Header userRole={userRole} />
      <div className="schedule-page">
        <h2>Harmonogram Treningów</h2>
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateChange}
            value={selectedDate}
            locale="pl"
            showNeighboringMonth={false}
            tileContent={({ date }) => {
              const events = trainingSchedule.filter(
                (event) =>
                  new Date(event.date).toDateString() === date.toDateString()
              );
              return events.length > 0 ? (
                <div data-tooltip-id={`tooltip-${date.toDateString()}`}>
                  <div className="highlight" />
                  <Tooltip
                    id={`tooltip-${date.toDateString()}`}
                    place="top"
                    effect="solid"
                  >
                    {events.map((event) => event.title).join(", ")}
                  </Tooltip>
                </div>
              ) : null;
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
              </div>
            ))
          ) : (
            <p>Brak treningów na ten dzień</p>
          )}
        </div>
        <h2>Harmonogram Meczów</h2>
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateChange}
            value={selectedDate}
            locale="pl"
            showNeighboringMonth={false}
            tileContent={({ date }) => {
              const events = matchSchedule.filter(
                (event) =>
                  new Date(event.date).toDateString() === date.toDateString()
              );
              return events.length > 0 ? (
                <div data-tooltip-id={`tooltip-${date.toDateString()}`}>
                  <div className="highlight" />
                  <Tooltip
                    id={`tooltip-${date.toDateString()}`}
                    place="top"
                    effect="solid"
                  >
                    {events.map((event) => event.title).join(", ")}
                  </Tooltip>
                </div>
              ) : null;
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

export default Schedule;
