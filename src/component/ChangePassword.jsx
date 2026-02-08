import React, { useState } from "react";
import "./style/ChangePassword.css";
import { useDispatch } from "react-redux";
import { setLoader } from "../Store/loderSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    }
    dispatch(setLoader(true));
    try {
      const res = await fetch(`${API_URL}/api/EVENT/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsError(false);
        setMessage(data.message || "Password changed successfully!");
        setPassword("");
        setConfirm("");
        navigate("/");
      } else {
        setIsError(true);
        setMessage(data.message || "Something went wrong!");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server error!");
    }
    finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="change-password-container">
      <div className="security-bg">
        <div className="grid-lines"></div>
        <div className="glow-circle"></div>
      </div>

      <form className="change-password-card" onSubmit={handleSubmit}>
        <h2>🔐 Change Password</h2>
        <div className="input-group">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Password</button>

        {message && (
          <p className={`message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
