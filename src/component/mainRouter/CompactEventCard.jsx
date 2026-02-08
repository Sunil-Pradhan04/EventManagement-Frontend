import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import "./RStyle/CompactEventCard.css";

const CompactEventCard = ({ event }) => {
    const navigate = useNavigate();

    // Format date safely
    const eventDate = event.createdAt ? new Date(event.createdAt).toLocaleDateString() : "Date N/A";

    return (
        <div
            className="compact-card"
            onClick={() => navigate(`/EventPage/${event._id}`, { state: { event } })}
        >
            <div className="compact-status-nipple"></div>

            <div className="compact-content">
                <div className="compact-header">
                    <h3 className="compact-title">{event.Ename}</h3>
                    <span className="compact-tag">{event.tags?.[0] || "Event"}</span>
                </div>

                <div className="compact-meta">
                    <div className="compact-date">
                        <FaCalendarAlt className="compact-icon" />
                        <span>{eventDate}</span>
                    </div>
                </div>
                {event.status === "finished" && event.winners && (
                    <div style={{ fontSize: "10px", color: "#FFD700", marginTop: "4px" }}>
                        🏆 {event.winners.filter(w => w).join(", ")}
                    </div>
                )}
            </div>

            <div className="compact-action">
                <FaChevronRight />
            </div>
        </div>
    );
};

export default CompactEventCard;
