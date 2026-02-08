import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/ChangePasswordRequest.css";
import { useDispatch } from "react-redux";
import { setLoader } from "../Store/loderSlice"; // import your loader action
import { API_URL } from "../config";

const ChangePasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address!");
      return;
    }

    setError("");
    dispatch(setLoader(true));

    try {
      const response = await fetch(`${API_URL}/api/EVENT/requestPasswordChange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError("Network error. Try again later.");
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="main_Container">
      <div className="form_card animate">
        {!submitted ? (
          <>
            <h2>🔒 Reset Password</h2>
            <form onSubmit={handleSubmit} className="form_content">
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn_primary">
                Next
              </button>
            </form>
            {error && <div className="error_box">{error}</div>}
            <p className="change_password_text" onClick={() => navigate(-1)}>
              Back to Login
            </p>
          </>
        ) : (
          <>
            <h2>📩 Check Your Email</h2>
            <p className="success_message">
              We’ve sent a verification code to <strong>{email}</strong>.
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <button
              className="btn_primary"
              onClick={() => navigate("/PasswordVerificaton", { state: { email } })}
            >
              Enter Verification Code
            </button>
            <p className="change_password_text" onClick={() => setSubmitted(false)}>
              Change Email
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordRequest;
