import React, { useState } from "react";
import "./RStyle/createEvent.css";
import { useDispatch } from "react-redux";
import { addEvent } from "../../Store/eventSlice";
import { setLoader } from "../../Store/loderSlice";
import { API_URL } from "../../config";

const CreateEvent = ({ onClose }) => {
  const [Ename, setEname] = useState("");
  const [coordinators, setCoordinators] = useState([""]);
  const [rules, setRules] = useState("");
  const [tags, setTags] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isIndoor, setIsIndoor] = useState(false);
  const [eventType, setEventType] = useState("Individual");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venue, setVenue] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [sendNotification, setSendNotification] = useState(true); // Default checked
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const handleAddCoordinator = () => setCoordinators([...coordinators, ""]);

  const handleRemoveCoordinator = (index) => {
    const list = [...coordinators];
    list.splice(index, 1);
    setCoordinators(list);
  };

  const handleCoordinatorChange = (index, value) => {
    const list = [...coordinators];
    list[index] = value;
    setCoordinators(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Ename || !rules || !contactNumber || !coordinators[0]) {
      setMsg("⚠️ Please fill all required (*) fields.");
      return;
    }

    if (rules.length > 1000) {
      setMsg("⚠️ Rules must not exceed 1000 characters.");
      return;
    }

    const tagArray = tags ? tags.split(",").map((t) => t.trim()) : [];

    const finalTags = [
      eventType,
      isIndoor ? "Indoor" : "Outdoor",
      ...tagArray,
    ];

    const eventData = {
      Ename,
      coordinators,
      tags: finalTags,
      contactNumber,
      visibility: true,
      rules,
      isIndoor,
      eventType,
      eventDate: eventDate || null,
      eventTime,
      venue,
      sendNotification,
    };

    try {
      dispatch(setLoader(true));
      const res = await fetch(`${API_URL}/api/EVENT/createEvent`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Event created successfully!");
        dispatch(addEvent(eventData));
        onClose(false);
      } else {
        setMsg(data.message || "❌ Failed to create event.");
      }
    } catch (err) {
      setMsg("❌ Server error: " + err.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="event-overlay">
      <div className="event-form-container glass">
        <button className="close-btn" onClick={() => onClose(false)}>
          ✖
        </button>

        <h2 className="form-title">Create New Event</h2>

        <form className="event-form" onSubmit={handleSubmit}>
          <label>
            Event Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={Ename}
            onChange={(e) => setEname(e.target.value)}
            placeholder="Enter event name"
          />

          <label>
            Coordinators <span style={{ color: "red" }}>*</span>
          </label>
          {coordinators.map((coord, index) => (
            <div key={index} style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={coord}
                onChange={(e) => handleCoordinatorChange(index, e.target.value)}
                placeholder={`Coordinator ${index + 1}`}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="add-btn"
                  style={{ background: "#e74c3c" }}
                  onClick={() => handleRemoveCoordinator(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={handleAddCoordinator}
          >
            ➕ Add Coordinator
          </button>

          <label>
            Rules <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Write event rules (max 1000 characters)"
            maxLength={1000}
            rows={10}
          ></textarea>
          <div className="char-count">{rules.length}/1000</div>

          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., tech, innovation, coding"
          />

          <label>
            Contact Number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
            pattern="[0-9]{10}"
          />

          <div className="checkbox-group">
            <div
              className={`checkbox-box ${isIndoor ? "checked" : ""}`}
              onClick={() => setIsIndoor(!isIndoor)}
            >
              {isIndoor && <span className="tick">✔</span>}
              Indoor Event
            </div>
          </div>

          <div className="checkbox-group">
            <div
              className={`checkbox-box ${eventType === "Individual" ? "checked" : ""
                }`}
              onClick={() => setEventType("Individual")}
            >
              {eventType === "Individual" && <span className="tick">✔</span>}
              Individual
            </div>
            <div
              className={`checkbox-box ${eventType === "Team" ? "checked" : ""
                }`}
              onClick={() => setEventType("Team")}
            >
              {eventType === "Team" && <span className="tick">✔</span>}
              Team
            </div>
          </div>

          {/* Email Notification Checkbox */}
          <div className="checkbox-group">
            <div
              className={`checkbox-box ${sendNotification ? "checked" : ""}`}
              onClick={() => setSendNotification(!sendNotification)}
              style={{ width: "100%", justifyContent: "center", background: sendNotification ? "rgba(0, 255, 136, 0.2)" : "rgba(255, 255, 255, 0.1)" }}
            >
              {sendNotification && <span className="tick">✔</span>}
              📧 Notify all registered users via email
            </div>
          </div>

          {/* Optional Fields */}
          <label>Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <label>Event Time</label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />

          <label>Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Enter event venue"
          />

          {msg && <div className="msg">{msg}</div>}

          <button type="submit" className="submit-btn">
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
