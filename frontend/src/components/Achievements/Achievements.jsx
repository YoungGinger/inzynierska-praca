import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Achievements.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/achievements/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Otrzymane dane:", data);
        setAchievements(data);

        const user = JSON.parse(localStorage.getItem("user"));
        setUserRole(user.role);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div>
      <Header userRole={userRole} />
      <div className="achievements-page">
        <h2>Osiągnięcia</h2>
        <div className="achievements-list">
          {achievements.map((achievement) => (
            <div className="achievement" key={achievement.id}>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <p>Data: {achievement.date}</p>
              <p>Gole: {achievement.goals}</p>
              <p>Mecze: {achievement.matches}</p>
              <p>
                Średnia liczba bramek na mecz:{" "}
                {achievement.average_goals_per_match.toFixed(2)}
              </p>
              <p>2-minutowe kary: {achievement.two_minute_penalties}</p>
              <p>Żółte kartki: {achievement.yellow_cards}</p>
              <p>Czerwone kartki: {achievement.red_cards}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
