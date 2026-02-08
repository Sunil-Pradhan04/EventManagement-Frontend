import React, { useState } from "react";

import "./RStyle/autoMail.css";
import { API_URL } from "../../config";

const AutoMail = ({ onClose, eventName }) => {
  const [step, setStep] = useState(1);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [sendMailLoader, setSendMailLoader] = useState(false);
  const generateMail = async () => {
    if (!userMessage.trim()) return;

    try {
      setStep(2);
      setLoading(true);
      const res = await fetch(`${API_URL}/api/EVENT/CreateMail`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: userMessage }),
      });
      const data = await res.json();
      setMail(data.mail);
      setLoading(false);
      setStep(3);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const sendMail = async () => {
    try {
      setSendMailLoader(true);
      setLoading(true);
      await fetch(`${API_URL}/api/EVENT/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ eventName: eventName, mailContent: mail }),
      });
      setLoading(false);
      onClose();
      setSendMailLoader(false);
    } catch (err) {
    } finally {
      setLoading(false);
      onClose();
      setSendMailLoader(false);
    }
  };

  return (
    <div className="blur-background">
      <div className="announcement-form-container">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Progress Bar */}
        <div className="stepper">
          {[1, 2, 3].map((num) => (
            <div className="step-wrapper" key={num}>
              <div
                className={`step-circle 
                  ${step > num ? "completed" : ""}
                  ${step === num ? "active" : ""}`}
              >
                {num}
              </div>
              {num !== 3 && (
                <div className="step-line">
                  <div
                    className={`step-line-fill ${step > num ? "completed" : ""}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <h2 className="form-title">Write Message</h2>
            <span className="form-subtitle">
              Describe the purpose of the email with one or two line:
            </span>
            <textarea
              rows="4"
              placeholder="Enter your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button className="submit-btn" onClick={generateMail}>
              Create Mail
            </button>
          </>
        )}

        {step === 2 && (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Creating mail...</p>
          </div>
        )}

        {step === 3 && (
          <>
            {sendMailLoader ? (
              <div className="loader-container">
                <div className="loader"></div>
                <p>Sendind mail...</p>
              </div>
            ) : (
              <div>
                <h2 className="form-title">Mail Preview</h2>
                <textarea rows="7" value={mail} readOnly />
                <button className="submit-btn" onClick={sendMail}>
                  Send Mail
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AutoMail;
