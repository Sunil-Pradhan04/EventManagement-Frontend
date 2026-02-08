// EventPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import "./RStyle/EventPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../Store/notificationSlice";
import { setLoader } from "../../Store/loderSlice";
import { updateEvent, fetchEventDetails } from "../../Store/eventSlice";
import { selectProfile } from "../../Store/ProfileSlice";
import AddAnnouncement from "./CreateEventAnoussment";
import EventAIChat from "../AiBlock/aiPage";
import EnrollmentPage from "./EnrollmentPage";
import { IoMailOpen, IoShareSocial, IoPencil, IoTrash } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import AutoMail from "./autoMail";
import EnrollmentList from "./EnrollmentList";
import EditEvent from "./EditEvent";

import { useParams } from "react-router-dom"; // Import useParams
import { API_URL } from "../../config";

const EventPage = () => {
  const { id } = useParams(); // Get ID from URL
  const location = useLocation();
  const userData = useSelector(selectProfile);
  const { event: initialEvent } = location.state || {};

  // Get live event data from store
  const eventList = useSelector((state) => state.events.list);

  // Find event by ID from URL or state
  // Priority: 1. URL ID, 2. State ID
  const targetId = id || initialEvent?._id;
  const event = eventList.find((e) => e._id === targetId) || initialEvent || {};

  console.log("EventPage ID:", id, "TargetID:", targetId, "Event:", event);

  const dispatch = useDispatch();

  useEffect(() => {
    if (targetId) {
      // Always fetch/refresh details to ensure we have the latest data (and cover the deep link case)
      dispatch(fetchEventDetails(targetId));
    }
  }, [dispatch, targetId]);

  const [active, setActive] = useState(event?.visibility || false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [addAnoussmentOpen, setAddAnoussmentOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [aiVisible, setAiVisible] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAutoMail, setShowAutoMail] = useState(false);

  const [showEnrollments, setShowEnrollments] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [winners, setWinners] = useState(["", "", ""]);
  const navigate = useNavigate(); // Ensure useNavigate is imported if not already

  const handleFinishEvent = async () => {
    console.log("Finishing event...", event._id, winners);
    try {
      const res = await fetch(`${API_URL}/api/EVENT/finishEvent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventId: event._id, winners: winners.filter(w => w.trim() !== "") }),
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        dispatch(showToast({ message: "Event Finished! 🏆", type: "success" }));
        setShowFinishModal(false);
        // Refresh event data to show changes
        dispatch(fetchEventDetails(event._id));
      } else {
        dispatch(showToast({ message: data.message || "Failed to finish event", type: "error" }));
      }
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error finishing event", type: "error" }));
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm("ARE YOU SURE? This will permanently delete the event, all participants, and announcements. This cannot be undone.")) return;

    try {
      dispatch(setLoader(true));
      const res = await fetch(`${API_URL}/api/EVENT/deleteEvent/${event._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        dispatch(showToast({ message: "Event Deleted Successfully", type: "success" }));
        navigate("/"); // Redirect to home
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.message || "Failed to delete event", type: "error" }));
      }
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error deleting event", type: "error" }));
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.Ename,
        text: `Check out ${event.Ename} at GEC EventHub!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch(showToast({ message: "Link copied to clipboard!", type: "success" }));
    }
  };

  const handleDeleteAnnouncement = async (id, e) => {
    e.stopPropagation(); // Prevent toggling expansion
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const res = await fetch(`${API_URL}/api/EVENT/deleteAnnouncement/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setAnnouncements((prev) => prev.filter((a) => a._id !== id));
        dispatch(showToast({ message: "Announcement deleted successfully", type: "success" }));
      } else {
        dispatch(showToast({ message: "Failed to delete announcement", type: "error" }));
      }
    } catch (err) {
      console.error("Error deleting announcement:", err);
      dispatch(showToast({ message: "Error deleting announcement", type: "error" }));
    }
  };

  const handleAddAnnouncement = async (announcement) => {
    const newAnnouncement = {
      Ename: event.Ename,
      Aheader: announcement.Aheader,
      Adescription: announcement.Adescription,
      sendNotification: announcement.sendNotification,
    };
    try {
      const res = await fetch(`${API_URL}/api/EVENT/AddAnnousement`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newAnnouncement),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        setAnnouncements((prev) => [
          { title: announcement.Aheader, content: announcement.Adescription, expanded: false },
          ...prev,
        ]);
      }
      setAddAnoussmentOpen(false);
    } catch (err) {
      console.error("Error adding announcement:", err);
    }
  };

  const toggleExpand = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, expanded: !a.expanded } : a))
    );
  };

  useEffect(() => {
    if (userData.role === "admin" && userData.events.includes(event.Ename)) {
      setIsCoordinator(true);
    } else {
      setIsCoordinator(false);
    }
  }, [userData, event?.Ename]);

  const handleToggle = async () => {
    try {
      dispatch(setLoader(true));
      const res = await fetch(`${API_URL}/api/EVENT/visibility/${event._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setActive((prev) => !prev);
        dispatch(updateEvent(data.event));
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}/api/EVENT/getEventAnoussments/${event.Ename}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setAnnouncements(
          data.anoussments.map((a, index) => ({
            id: index,
            _id: a._id, // Store real ID for deletion
            title: a.Aheader,
            content: a.Adescription,
            expanded: false,
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [event?.Ename]);

  return (
    <div className="event-page-container">
      {showAutoMail && <AutoMail onClose={() => setShowAutoMail(false)} eventName={event.Ename} />}
      {showEnrollments && <EnrollmentList eventName={event.Ename} onClose={() => setShowEnrollments(false)} />}
      {showEditModal && <EditEvent event={event} onClose={(success) => { setShowEditModal(false); if (success) dispatch(fetchEventDetails(event._id)); }} />}
      {aiVisible && <EventAIChat event={event} setAiVisible={setAiVisible} />}
      {addAnoussmentOpen && (
        <AddAnnouncement
          setAddAnoussmentOpen={setAddAnoussmentOpen}
          Add={handleAddAnnouncement}
          isCoordinator={isCoordinator}
        />
      )}
      {showEnrollment && (
        <EnrollmentPage
          setShowEnrollment={setShowEnrollment}
          userName={userData.name}
          email={userData.email}
          EventName={event.Ename}
        />
      )}

      <div className="event-main-card">
        <div className="event-header">
          <h1>{event?.Ename || "Event"}</h1>

          {isCoordinator ? (
            <div className="header-controls">
              <button className="settings-btn" onClick={handleShare} aria-label="Share"> <IoShareSocial /> </button>
              <button
                className="settings-btn"
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Settings"
              >
                <IoIosSettings />
              </button>

              <div
                className={`visibility-toggle ${active ? "active" : ""}`}
                onClick={handleToggle}
                role="switch"
                aria-checked={active}
              >
                <div className="toggle-knob" />
              </div>
            </div>
          ) : (
            <div className="header-controls">
              <button className="settings-btn" onClick={handleShare} aria-label="Share"> <IoShareSocial /> </button>
            </div>
          )}
        </div>

        {showSettings && isCoordinator && (
          <div className="settings-dropdown">
            <ul>
              <li onClick={() => { setShowAutoMail(true); setShowSettings(false); }}>
                <IoMailOpen /> Auto Mail
              </li>
              <li onClick={() => { setShowEnrollments(true); setShowSettings(false); }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>👥 Show Enrollments</span>
              </li>
              <li onClick={() => { setShowEditModal(true); setShowSettings(false); }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><IoPencil /> Edit Event</span>
              </li>
              <li onClick={() => {
                setShowFinishModal(true);
                setShowSettings(false);
              }}
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", color: "#ff4d4d", marginTop: "5px", paddingTop: "5px" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>🏁 Finish Event</span>
              </li>
              <li onClick={() => {
                handleDeleteEvent();
                setShowSettings(false);
              }}
                style={{ color: "#ff4d4d" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><IoTrash /> Delete Event</span>
              </li>
              <li>────────────</li>
            </ul>
          </div>
        )}

        <div className="event-meta">
          <div className="tags">
            {event?.tags?.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>

          <div className="coordinators">
            {event?.coordinators?.map((coord, idx) => (
              <span key={idx} className="coordinator-pill">{coord}</span>
            ))}
          </div>
        </div>

        <div className="event-details-grid">
          <div className="info-block">
            <p><strong>Date:</strong> {event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
              : "TBA"}</p>
            <p><strong>Time:</strong> {event?.eventTime || "TBA"}</p>
            <p><strong>Venue:</strong> {event?.venue || "TBA"}</p>
          </div>

          <div className="contact-block">
            <div className="phone-container">
              <span className="phone-icon">📞</span>
              <span className="phone-number">+91 {event?.contactNumber || "—"}</span>
            </div>
          </div>
        </div>

        <button
          className={`register-button ${userData.RegistrEvents?.some((e) => e.Ename === event.Ename) ? "registered" : ""}`}
          onClick={() => !userData.RegistrEvents?.some((e) => e.Ename === event.Ename) && setShowEnrollment(true)}
          disabled={userData.RegistrEvents?.some((e) => e.Ename === event.Ename)}
        >
          {userData.RegistrEvents?.some((e) => e.Ename === event.Ename) ? "✓ Confirmed" : "Register Now"}
        </button>
      </div>

      {/* AI Interaction Card */}
      <div className="ai-card" onClick={() => setAiVisible(true)}>
        <div className="ai-visual-wrapper">
          <div className="orb-container">
            <div className="orb-core" />
            <div className="orb-glow" />
            <div className="orb-pulse" />
          </div>
        </div>

        <div className="ai-action">
          <button className="ai-chat-trigger">Chat with Event AI</button>
          <p className="ai-hint">Ask anything about this event</p>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="announcements-section">
        <div className="section-header">
          <h2>Event Announcements</h2>
          {isCoordinator && (
            <button className="add-announcement-btn" onClick={() => setAddAnoussmentOpen(true)}>
              + New Announcement
            </button>
          )}
        </div>

        {announcements.length === 0 ? (
          <div className="empty-state">No announcements yet.</div>
        ) : (
          <div className="announcement-grid">
            {announcements.map((a) => (
              <div
                key={a.id}
                className={`announcement-card ${a.expanded ? "expanded" : ""}`}
                onClick={() => toggleExpand(a.id)}
              >
                <div className="announcement-title-row">
                  <h3>{a.title}</h3>
                  <div className="announcement-actions">
                    {isCoordinator && (
                      <button
                        className="delete-announcement-btn"
                        onClick={(e) => handleDeleteAnnouncement(a._id, e)}
                        title="Delete Announcement"
                      >
                        🗑️
                      </button>
                    )}
                    <span className="expand-icon">{a.expanded ? "▲" : "▼"}</span>

                  </div>
                </div>
                <div className={`announcement-body ${a.expanded ? "visible" : ""}`}>
                  {a.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showFinishModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", zIndex: 10002,
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "#181f23", border: "1px solid #00eaff", borderRadius: "16px",
            padding: "30px", width: "90%", maxWidth: "400px", position: "relative",
            boxShadow: "0 0 20px rgba(0, 234, 255, 0.2)"
          }}>
            <h2 style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}>🎉 Finish Event</h2>
            <p style={{ color: "#aaa", fontSize: "12px", marginBottom: "20px", textAlign: "center" }}>
              Enter the winners. This will <b>clear all participants</b> and mark the event as finished.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                placeholder="🥇 1st Place Name"
                value={winners[0]}
                onChange={(e) => {
                  const newWinners = [...winners];
                  newWinners[0] = e.target.value;
                  setWinners(newWinners);
                }}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333", background: "#111", color: "#fff" }}
              />
              <input
                placeholder="🥈 2nd Place Name"
                value={winners[1]}
                onChange={(e) => {
                  const newWinners = [...winners];
                  newWinners[1] = e.target.value;
                  setWinners(newWinners);
                }}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333", background: "#111", color: "#fff" }}
              />
              <input
                placeholder="🥉 3rd Place Name"
                value={winners[2]}
                onChange={(e) => {
                  const newWinners = [...winners];
                  newWinners[2] = e.target.value;
                  setWinners(newWinners);
                }}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333", background: "#111", color: "#fff" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
              <button
                onClick={() => setShowFinishModal(false)}
                style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #555", background: "transparent", color: "#fff", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleFinishEvent}
                style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg, #00eaff, #0077ff)", color: "#000", fontWeight: "bold", cursor: "pointer" }}
              >
                Finish & Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;