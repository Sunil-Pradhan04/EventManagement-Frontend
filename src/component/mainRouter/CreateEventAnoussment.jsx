import React from "react";
import "./RStyle/CreateEventAnoussment.css";


const AddAnnouncement = ({ setAddAnoussmentOpen, Add, isCoordinator }) => {
  const [form, setForm] = React.useState({
    Aheader: "",
    Adescription: "",
    sendNotification: true, // Default checked
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Add(form);
  };

  return (
    <div className="blur-background">
      <div className="announcement-form-container">
        <button
          className="close-btn"
          onClick={() => setAddAnoussmentOpen(false)}
        >
          ✖
        </button>
        <h2 className="form-title">📢 Add Event Announcement</h2>

        <div className="announcement-form">
          <label>Announcement Header:</label>
          <input
            type="text"
            name="Aheader"
            value={form.Aheader}
            onChange={handleChange}
            placeholder="Enter Announcement Header"
            required
          />

          <label>Announcement Description:</label>
          <textarea
            name="Adescription"
            value={form.Adescription}
            onChange={handleChange}
            placeholder="Enter detailed description..."
            rows="4"
            required
          ></textarea>

          {/* Email Notification Checkbox */}
          <div className="checkbox-group" style={{ margin: "10px 0" }}>
            <div
              className={`checkbox-box ${form.sendNotification ? "checked" : ""}`}
              onClick={() => setForm({ ...form, sendNotification: !form.sendNotification })}
              style={{
                width: "100%", justifyContent: "center",
                background: form.sendNotification ? "rgba(0, 255, 136, 0.2)" : "rgba(255, 255, 255, 0.1)",
                padding: "10px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", color: "white", userSelect: "none"
              }}
            >
              {form.sendNotification && <span>✔</span>}
              📧 Notify participants via email
            </div>
          </div>

          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Add Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
