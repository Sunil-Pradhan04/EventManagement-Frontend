import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/PostVerificaton.css";

const PostVerification = ({ checkSession }) => {
  const navigate = useNavigate();

  return (
    <div className="main_Container">
      <div className="bgStyle"></div>
      <div className="form_card animate">
        <h2>✅ Verification Successful!</h2>
        <p className="info_text">
          Your account has been verified. What would you like to do next?
        </p>

        <div className="button_group">
          <button
            className="btn_primary"
            onClick={async () => {
              await checkSession();
              navigate("/");
            }}
          >
            Go to Home
          </button>

          <button
            className="btn_secondary"
            onClick={async () => {
              await checkSession();
              navigate("/ChangePassword");
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostVerification;
