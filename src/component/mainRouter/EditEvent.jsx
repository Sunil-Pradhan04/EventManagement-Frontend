import React, { useState } from "react";
import "./RStyle/createEvent.css";
import { useDispatch } from "react-redux";
import { setLoader } from "../../Store/loderSlice";
import { API_URL } from "../../config";
import { updateEvent } from "../../Store/eventSlice";

const EditEvent = ({ event, onClose }) => {
    const [contactNumber, setContactNumber] = useState(event.contactNumber || "");
    const [eventDate, setEventDate] = useState(event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : "");
    const [eventTime, setEventTime] = useState(event.eventTime || "");
    const [venue, setVenue] = useState(event.venue || "");
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contactNumber) {
            setMsg("⚠️ Contact number is required.");
            return;
        }

        const eventData = {
            contactNumber,
            eventDate: eventDate || null,
            eventTime,
            venue,
        };

        try {
            dispatch(setLoader(true));
            const res = await fetch(`${API_URL}/api/EVENT/updateEvent/${event._id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData),
            });

            const data = await res.json();
            if (res.ok) {
                setMsg("✅ Event updated successfully!");
                // Update local state or trigger refresh
                dispatch(updateEvent(data.event)); // Assuming you have an updateEvent reducer
                setTimeout(() => onClose(true), 1500); // Close after success
            } else {
                setMsg(data.message || "❌ Failed to update event.");
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

                <h2 className="form-title">Edit Event: {event.Ename}</h2>
                <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '20px' }}>Note: Name, Rules, and Coordinators cannot be changed.</p>

                <form className="event-form" onSubmit={handleSubmit}>

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

                    {msg && <div className="msg" style={{ color: msg.startsWith("✅") ? "#00ff88" : "#ff4d4d" }}>{msg}</div>}

                    <button type="submit" className="submit-btn">
                        Update Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
