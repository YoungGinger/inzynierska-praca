import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./TeamManagement.css";

const TeamManagement = () => {
  const [players, setPlayers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
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

        const user = JSON.parse(localStorage.getItem("user"));
        setUserRole(user.role);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  };

  const getFilteredPlayers = () => {
    return players.filter((player) =>
      player.username.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const getSortedPlayers = (filteredPlayers) => {
    return filteredPlayers.sort((a, b) => {
      if (sortKey === "goals") {
        return b.goals - a.goals;
      } else if (sortKey === "matches") {
        return b.matches - a.matches;
      } else if (sortKey === "two_minute_penalties") {
        return b.two_minute_penalties - a.two_minute_penalties;
      } else if (sortKey === "yellow_cards") {
        return b.yellow_cards - a.yellow_cards;
      } else if (sortKey === "red_cards") {
        return b.red_cards - a.red_cards;
      }
      return 0;
    });
  };

  const filteredPlayers = getFilteredPlayers();
  const sortedPlayers = getSortedPlayers(filteredPlayers);

  const teamStats = {
    totalGoals: players.reduce((acc, player) => acc + player.goals, 0),
    totalMatches: players.reduce((acc, player) => acc + player.matches, 0),
    totalPenalties: players.reduce(
      (acc, player) => acc + player.two_minute_penalties,
      0
    ),
    totalYellowCards: players.reduce(
      (acc, player) => acc + player.yellow_cards,
      0
    ),
    totalRedCards: players.reduce((acc, player) => acc + player.red_cards, 0),
  };

  return (
    <div>
      <Header userRole={userRole} />
      <div className="team-management-page">
        <h2>Zarządzanie Drużyną</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Filtruj po nazwie"
            value={filter}
            onChange={handleFilterChange}
          />
          <select value={sortKey} onChange={handleSortChange}>
            <option value="">Sortuj według</option>
            <option value="goals">Gole</option>
            <option value="matches">Mecze</option>
            <option value="two_minute_penalties">2-minutowe kary</option>
            <option value="yellow_cards">Żółte kartki</option>
            <option value="red_cards">Czerwone kartki</option>
          </select>
        </div>
        <div className="team-stats">
          <h3>Statystyki Drużyny</h3>
          <p>Łączna liczba goli: {teamStats.totalGoals}</p>
          <p>Łączna liczba meczów: {teamStats.totalMatches}</p>
          <p>Łączna liczba kar 2-minutowych: {teamStats.totalPenalties}</p>
          <p>Łączna liczba żółtych kartek: {teamStats.totalYellowCards}</p>
          <p>Łączna liczba czerwonych kartek: {teamStats.totalRedCards}</p>
        </div>
        <div className="players-list">
          {sortedPlayers.map((player) => (
            <div className="player-card" key={player.id}>
              <img
                src={`http://127.0.0.1:8000${player.photo}`}
                alt={player.username}
              />
              <h3>{player.username}</h3>
              <p>Pozycja: {player.position}</p>
              <p>Gole: {player.goals}</p>
              <p>Mecze: {player.matches}</p>
              <p>2-minutowe kary: {player.two_minute_penalties}</p>
              <p>Żółte kartki: {player.yellow_cards}</p>
              <p>Czerwone kartki: {player.red_cards}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
