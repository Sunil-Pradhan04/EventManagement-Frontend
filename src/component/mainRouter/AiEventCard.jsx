import React, { useState } from "react";
import { FaRobot, FaBolt, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectProfile } from "../../Store/ProfileSlice";
import EventAIChat from "../AiBlock/aiPage";
import AutoMail from "./autoMail"; // Assuming this is your Quick Mail component
import "./RStyle/Ai.css";

import { useNavigate } from "react-router-dom"; // Import useNavigate

const AiEventCard = ({ event }) => {
  const navigate = useNavigate(); // Initialize hook
  const user = useSelector(selectProfile);
  const [showChat, setShowChat] = useState(false);
  const [showMail, setShowMail] = useState(false);

  // Check permissions: Admin (Creator) OR Event Coordinator
  const canSendMail =
    (user.role === "admin" && (user.events || []).includes(event.Ename)) ||
    (event.coordinators && event.coordinators.includes(user.email));

  return (
    <>
      <div className="ai-event-card">
        <div className="card-header">
          <div className="ai-badge">AI Enabled</div>
          <FaRobot className="icon ai-icon-anim" color="#8b5cf6" />
        </div>

        <h3
          className="event-name"
          onClick={() => navigate(`/EventPage/${event._id}`, { state: { event } })}
          style={{ cursor: "pointer" }}
        >
          {event.Ename}
        </h3>

        <div className="event-tags">
          {event.tags &&
            event.tags.map((tag, i) => (
              <span key={i} className="tag">
                #{tag}
              </span>
            ))}
        </div>

        <div className="card-actions">
          <button className="action-btn ask-ai-btn" onClick={() => setShowChat(true)}>
            <FaBolt /> Ask AI
          </button>

          {canSendMail && (
            <button className="action-btn quick-mail-btn" onClick={() => setShowMail(true)}>
              <FaEnvelope /> Quick Mail
            </button>
          )}
        </div>
      </div>

      {/* Render AI Chat Overlay */}
      {showChat && <EventAIChat event={event} setAiVisible={setShowChat} />}

      {/* Render Quick Mail Overlay */}
      {showMail && <AutoMail eventName={event.Ename} onClose={() => setShowMail(false)} />}
    </>
  );
};

export default AiEventCard;
