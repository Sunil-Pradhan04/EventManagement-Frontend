import { Navigate, useNavigate } from "react-router-dom";
import "./RStyle/eBox.css";
import { FaDotCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectProfile } from "../../Store/ProfileSlice";
import { useEffect, useState } from "react";

const EBox = ({ event }) => {
  const navigate = useNavigate();
  const profileData = useSelector(selectProfile);
  console.log(event);
  const [visible, setVisible] = useState(false);
  const createdDate = new Date(event.createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate - createdDate;
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  useEffect(() => {
    if (
      !event.visibility &&
      event.status !== "finished" &&
      !(profileData.events || []).includes(event.Ename)
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [event, profileData]);
  return (
    <div className="eBox high">
      {visible && <div className="inactive"></div>}
      <div className="anim"></div>
      <div className="eName">
        <FaDotCircle />
        {event.Ename}
      </div>
      <div className={event.visibility ? "active1" : "active2"}>
        <div className={event.visibility ? "sty1" : "sty2"}></div>
      </div>
      <div className="tags">
        {event.tags.slice(0, 2).map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      </div>
      <div className="days-a-go">{daysAgo} days ago</div>

      {/* Winners Podium Display - Semi-transparent blur overlay */}
      {event.status === "finished" && event.winners && (
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "calc(100% - 70px)", // Leave space for the button at bottom
          background: "rgba(0, 0, 0, 0.3)", // Semi-transparent
          backdropFilter: "blur(3px)", // Blur effect
          zIndex: "10",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            color: "#ffd700",
            fontSize: "14px",
            fontWeight: "900",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "0 0 10px rgba(0,0,0,0.8)"
          }}>
            🏆 WINNERS 🏆
          </div>
          <div style={{
            color: "#e0e0e0",
            fontSize: "10px",
            fontWeight: "700",
            marginBottom: "10px",
            marginTop: "-8px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textShadow: "0 0 5px rgba(0,0,0,0.8)"
          }}>
            {event.Ename}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "90%" }}>
            {event.winners[0] && (
              <div style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: "8px",
                padding: "4px",
                color: "#ffd700",
                fontWeight: "bold",
                fontSize: "13px",
                textAlign: "center",
                border: "1px solid rgba(255, 215, 0, 0.3)"
              }}>
                🥇 {event.winners[0]}
              </div>
            )}
            {event.winners[1] && <div style={{ color: "#fff", fontSize: "12px", fontWeight: "600", textAlign: "center", textShadow: "0 0 5px #000" }}>🥈 {event.winners[1]}</div>}
            {event.winners[2] && <div style={{ color: "#fff", fontSize: "12px", fontWeight: "600", textAlign: "center", textShadow: "0 0 5px #000" }}>🥉 {event.winners[2]}</div>}
          </div>
        </div>
      )}

      {(() => {
        const isAuthorized = profileData?.role === "admin" || (profileData?.events || []).includes(event.Ename);

        return (
          <div
            className={`register-demo ${event.status === "finished" ? "finished" : ""}`}
            style={event.status === "finished" ? {
              background: "linear-gradient(135deg, #1f1f1f, #2a2a2a)",
              color: "#ffd700",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              cursor: isAuthorized ? "pointer" : "not-allowed",
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
              opacity: isAuthorized ? 1 : 0.8
            } : {}}
            onClick={() => {
              // Only allow navigation if event is active OR user is authorized (admin/coordinator)
              if (event.status !== "finished" || isAuthorized) {
                navigate(`/EventPage/${event._id}`, { state: { event } });
              }
            }}
          >
            {event.status === "finished"
              ? (isAuthorized ? "View Results 🏆" : "✨ Event Concluded")
              : profileData.RegistrEvents?.some((e) => e.Ename === event.Ename)
                ? "Registered"
                : event.visibility
                  ? "Register Now"
                  : "Unavailable"}
          </div>
        );
      })()}
    </div>
  );
};
export default EBox;
