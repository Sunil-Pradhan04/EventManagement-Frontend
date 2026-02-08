import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../Store/notificationSlice";
import "./RStyle/Profile.css";
import { fetchProfile, selectProfile } from "../../Store/ProfileSlice";
import { useEffect, useState } from "react";
import CompactEventCard from "./CompactEventCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Profile = () => {
  const ProfileData = useSelector(selectProfile);
  const status = useSelector((state) => state.profile.status);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook for dispatch

  // Random color for avatar background
  const [avatarColor, setAvatarColor] = useState("#00eaff");

  useEffect(() => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FF33A1", "#33FFF5", "#FFE333"];
    setAvatarColor(colors[Math.floor(Math.random() * colors.length)]);

    // Fetch profile if not already available or empty
    if (!ProfileData) {
      dispatch(fetchProfile());
    }
  }, [dispatch, ProfileData]); // Added dependencies

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/EVENT/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        // Force reload to trigger App.js checkSession and redirect to login
        window.location.href = "/";
        dispatch(showToast({ message: "Logged out", type: "success" }));
      } else {
        dispatch(showToast({ message: "Logout failed. Please try again.", type: "error" }));
      }
    } catch (err) {
      console.error("Logout error:", err);
      dispatch(showToast({ message: "An error occurred during logout.", type: "error" }));
    }
  };

  if (status === "loading" || !ProfileData) {
    return (
      <div className="profile-container">
        <div className="loader"></div>
      </div>
    );
  }

  // Get first letter of name
  const firstLetter = ProfileData.name ? ProfileData.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="profile-container">
      {/* Background Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div className="profile-glass-card">

        {/* Header Section */}
        <div className="profile-header-new">
          <div className="avatar-container">
            <div className="avatar-ring"></div>
            <div className="avatar-new" style={{ backgroundColor: avatarColor, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              {firstLetter}
            </div>
          </div>

          <div className="user-details">
            <h2>{ProfileData.name}</h2>
            <p>{ProfileData.email}</p>
          </div>

          <button className="logout-trigger" onClick={handleLogout}>
            Logout Securely
          </button>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <div className="section-title">Participated Events</div>

          {ProfileData.RegistrEvents && ProfileData.RegistrEvents.length > 0 ? (
            <div className="events-list-animated">
              {ProfileData.RegistrEvents.map((event, index) => (
                <div
                  className="event-item-wrapper"
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s`, width: "100%", display: "flex", justifyContent: "center" }}
                >
                  <CompactEventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't participated in any events yet. Join one to see it here!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;