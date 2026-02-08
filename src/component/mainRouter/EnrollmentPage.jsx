import React from "react";
import "./RStyle/EnrollmentPage.css";
import { useDispatch } from "react-redux";
import { showToast } from "../../Store/notificationSlice";
import { API_URL } from "../../config";

const EnrollmentPage = ({ userName, email, EventName, setShowEnrollment }) => {
  const dispatch = useDispatch();


  const handleEnrollment = async () => {
    try {
      const response = await fetch(`${API_URL}/api/EVENT/Enrollment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, UserEmail: email, EventName }),
      });

      if (response.ok) {
        dispatch(showToast({ message: "Enrollment Successful!", type: "success" }));
        setShowEnrollment(false);
      } else {
        const errorData = await response.json();
        dispatch(showToast({ message: "Enrollment Failed: " + errorData.message, type: "error" }));
      }

    } catch (err) {
      console.error("Enrollment Error:", err);
      dispatch(showToast({ message: "Something went wrong. Please try again.", type: "error" }));
    }
  };

  return (
    <div className="enrollmentPage">
      <button className="closeBtn" onClick={() => setShowEnrollment(false)}>
        ✕
      </button>

      {/* Header */}
      <div className="enrollHeader">Register Now</div>

      {/* Form */}
      <div className="enrollForm">
        <label>User Name</label>
        <input type="text" value={userName} readOnly />

        <label>Email</label>
        <input type="email" value={email} readOnly />

        <button className="confirmBtn" onClick={handleEnrollment}>Conform Register</button>
      </div>
    </div>
  );
};

export default EnrollmentPage;
