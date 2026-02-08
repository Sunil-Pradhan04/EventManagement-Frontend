import React, { use, useEffect, useState } from "react";
import "./style/Home.css";
import { useDispatch } from "react-redux";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./mainRouter/Landing";
import Clubs from "./mainRouter/Clubs";
import Events from "./mainRouter/Events";
import Ai from "./mainRouter/Ai";
import Profile from "./mainRouter/Profile";
import { fetchProfile } from "../Store/ProfileSlice";
import EventPage from "./mainRouter/EventPage";

const Home = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 8) + 5;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        setLoading(false);
      }
      setProgress(percent);
    }, 120);
    return () => clearInterval(interval);
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);
  if (loading) {
    return (
      <div className={`entryStyle ${progress === 100 ? "fade-out" : ""}`}>
        <div className="loader-bg">
          <div className="glow-circle"></div>
          <div className="progress-text">{progress}%</div>
          <div className="loading-bar">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="header">
        <div className="logo">GEC EventHub</div>

        <div className="link">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/Clubs">Clubs</NavLink>
          <NavLink to="/Events">Events</NavLink>
          <NavLink to="/Ai">Ai</NavLink>
          <NavLink to="/Profile">Profile</NavLink>
        </div>

        {/* Mobile toggle */}
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00eaff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
            <nav className="sidebar" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                &times;
              </button>
              <NavLink to="/" end onClick={() => setSidebarOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/Clubs" onClick={() => setSidebarOpen(false)}>
                Clubs
              </NavLink>
              <NavLink to="/Events" onClick={() => setSidebarOpen(false)}>
                Events
              </NavLink>
              <NavLink to="/Ai" onClick={() => setSidebarOpen(false)}>
                Ai
              </NavLink>
              <NavLink to="/Profile" onClick={() => setSidebarOpen(false)}>
                Profile
              </NavLink>
            </nav>
          </div>
        )}
      </div>

      <div className="body">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="Clubs" element={<Clubs />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Ai" element={<Ai />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/EventPage/:id" element={<EventPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
