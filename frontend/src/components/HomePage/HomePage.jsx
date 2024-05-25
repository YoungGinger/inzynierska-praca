import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./HomePage.css";

const HomePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User data from localStorage:", user);
    setUserData(user);
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header userRole={userData.role} />
      <main className="home-page">
        <div className="profile-section">
          {userData.photo ? (
            <img
              src={`http://127.0.0.1:8000${userData.photo}`}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <p>No profile picture available</p>
          )}
          <h1>Witaj, {userData.username}!</h1>
          {userData.is_player && <p>Pozycja: {userData.position}</p>}
        </div>
        <div className="content-section">
          <section className="news">
            <h2>Ostatnie Aktualności</h2>
            <ul>
              <li>Trening przeniesiony na środę, godzina 18:00</li>
              <li>Nowy zawodnik dołącza do drużyny</li>
              <li>Mecz z drużyną X w sobotę o 16:00</li>
            </ul>
          </section>

          <section className="schedule">
            <h2>Najbliższe Wydarzenia</h2>
            <ul>
              <li>Trening: 20 maja, godzina 18:00</li>
              <li>Mecz: 22 maja, godzina 16:00</li>
              <li>Spotkanie zarządu: 25 maja, godzina 10:00</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
