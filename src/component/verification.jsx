import React, { useEffect, useRef, useState } from "react";
import "./style/VerificationCode.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../Store/loderSlice";
import { API_URL } from "../config";

const VerificationCode = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();
  const [reSend, setReSend] = useState(120);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reSend <= 0) {
      return;
    }
    const intervalId = setInterval(() => {
      setReSend(prev => prev - 1);
    }, 1000)
    return () => clearInterval(intervalId);
  }, [reSend])

  const minutes = Math.floor(reSend / 60);
  const seconds = reSend % 60;


  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 6) {
      if (!email) {
        setError("Email not found. Please register again.");
        return;
      }
      try {
        setError("");
        dispatch(setLoader(true));
        const res = await fetch(`${API_URL}/api/EVENT/verification`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: enteredCode, email }),
        });

        const data = await res.json();
        dispatch(setLoader(false));

        if (!res.ok) {
          setError(data.message || "Verification failed. Please try again.");
        } else {
          navigate("/");
        }
      } catch (err) {
        dispatch(setLoader(false));
        setError("Something went wrong. Please try again later.");
      }
    } else {
      setError("Please enter a 6-digit code.");
    }
  };

  const resendCode = async () => {
    try {
      console.log(email);
      const response = await fetch(`${API_URL}/api/EVENT/resendCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (err) {
      throw new Error(err.message || "Network error");
    }
  };

  return (
    <div className="verify-container">
      <h2 className="verify-title">🔐 Enter Verification Code</h2>
      <p className="verify-subtitle">We sent a 6-digit code to your email</p>

      {error && <div className="verify-error">{error}</div>}

      <div className="verify-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="verify-input"
          />
        ))}
      </div>

      <button className="verify-btn" onClick={handleVerify}>
        Verify
      </button>

      <p className="verify-resend">
        Didn’t receive the code?{" "}
        {reSend > 0 ? (
          <span className="resend-link">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </span>
        ) : (
          <span
            className="resend-link"
            onClick={() => {
              resendCode();
              setError("Code resent successfully!");
              setReSend(120);
            }}
          >
            Resend
          </span>
        )}

      </p>
    </div>
  );
};

export default VerificationCode;
