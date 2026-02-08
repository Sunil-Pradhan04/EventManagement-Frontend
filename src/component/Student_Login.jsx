import "./style/Student_Login.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../Store/loderSlice";
import { showToast } from "../Store/notificationSlice";
import { API_URL } from "../config";

const Student_Login = ({ checkSession }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (isLogin) {
      if (email.trim() === "" || password.trim() === "") {
        setError("Please enter email and password.");
        return;
      }
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else {
      if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        setError("Please fill in all required fields.");
        return;
      }
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 6 characters, include a letter and a number."
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

      const url = isLogin
        ? `${API_URL}/api/EVENT/login`
        : `${API_URL}/api/EVENT/create`;

      const body = isLogin ? { email, password } : { name, email, password };

      let res, data;
      try {
        res = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        data = await res.json();
      } catch (networkErr) {
        setError("Network error: Unable to reach the server.");
        return;
      }

      if (!res.ok) {
        dispatch(showToast({ message: data.message || "Unexpected error", type: "error" }));
        return;
      }

      dispatch(showToast({ message: isLogin ? "Login Successful" : "Registration Successful", type: "success" }));

      if (isLogin) {
        navigation("/");
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
        <h2>{isLogin ? "Login" : "Register"}</h2>

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

          <button type="submit" className="btn_primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle_text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
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

        {error && <div className="error_box">{error}</div>}
      </div>
    </div>
  );
};

export default Student_Login;
