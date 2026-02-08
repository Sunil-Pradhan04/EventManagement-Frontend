import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../config";

const PasswordVerification = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setError("Verification code is required!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/EVENT/createPasswordResetSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Verification failed");
        return;
      }

      navigate("/PostVerificaton");
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main_Container">
      <div className="form_card animate">
        <h2>🔑 Verify Your Account</h2>
        <p className="info_text">
          We’ve sent a verification code to <strong>{email}</strong>.
          Please enter it below to continue.
        </p>

        <form onSubmit={handleSubmit} className="form_content">
          <input
            type="number"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button type="submit" className="btn_primary" disabled={loading}>
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        {error && <div className="error_box">{error}</div>}

        <p className="change_password_text" onClick={() => navigate(-1)}>
          ← Go Back
        </p>
      </div>
    </div>
  );
};

export default PasswordVerification;
