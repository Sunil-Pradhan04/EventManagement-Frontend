import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Student_Login.css";
import { useDispatch } from "react-redux";
import { setLoader } from "../Store/loderSlice";
import { showToast } from "../Store/notificationSlice";
import { API_URL } from "../config";

const Student_Login = ({ checkSession }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const adminPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";
    const adminPassword = adminPasswordRef.current?.value || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    // ----- Validation -----
    if (
      !email ||
      !password ||
      (!isLogin && !name) ||
      (!isLogin && !confirmPassword) ||
      (!isLogin && !adminPassword)
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!isLogin) {
      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 6 characters with a letter and a number."
        );
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      dispatch(setLoader(true));
      setError("");
      setSuccess("");

      // ----- Decide URL -----
      let url = "";
      let body = {};

      if (isLogin) {
        url = `${API_URL}/api/EVENT/login`;
        body = { email, password };
      } else {
        // Use adminPassword if this is an admin register
        url = `${API_URL}/api/EVENT/createAdmin`; // user
        body = { name, email, password, adminPassword };
      }

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(showToast({ message: data.message || "Unexpected error", type: "error" }));
        return;
      }

      dispatch(showToast({ message: data.message, type: "success" }));

      // ----- Navigate -----
      if (isLogin) {
        navigation("/"); // go to home/dashboard after login
      } else {
        navigation("/verification", { state: { email } });
      }
    } catch (err) {
      dispatch(showToast({ message: err.message || "Unexpected error occurred.", type: "error" }));
    } finally {
      checkSession();
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="main_Container">
      <div className="bgStyle">
        <div className="corner-panel corner-top-left">
          <div className="tag">Club</div>
          <div className="title">Tech Club</div>
          <div className="desc">Register</div>
        </div>

        <div className="corner-panel corner-top-right">
          <div className="tag">Events</div>
          <div className="title">Tech fest</div>
          <div className="desc">Enrole</div>
        </div>

        <div className="corner-panel corner-bottom-left">
          <div className="tag">Announcement</div>
          <div className="title">New Venue</div>
          <div className="desc">Date & Place</div>
        </div>

        <div className="corner-panel corner-bottom-right">
          <div className="tag">Message</div>
          <div className="title">Reminder</div>
          <div className="desc">Submit event forms</div>
        </div>
      </div>

      <div className="form_card animate">
        <h2>{isLogin ? "Admin Login" : "Admin Register"}</h2>

        {error && <div className="error_box">{error}</div>}
        {success && <div className="success_box">{success}</div>}

        <form className="form_content" onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Full Name" ref={nameRef} />
          )}
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
            />
          )}
          {!isLogin && (
            <input
              type="password"
              placeholder="Admin Password"
              ref={adminPasswordRef}
            />
          )}

          <button type="submit" className="btn_primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle_text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
          >
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
        {isLogin && (
          <p className="change_password_text">
            <span onClick={() => navigation("/ChangePasswordRequest")}>
              Forgot Password?
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Student_Login;
