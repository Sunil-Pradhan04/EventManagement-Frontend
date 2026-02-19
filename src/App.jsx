import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Student_Login from './component/Student_Login'
import Teacher_Login from './component/Teacher_Login'
import Home from './component/Home'
import { useState, useEffect } from 'react'
import Loader from './component/Loader'
import VerificationCode from './component/verification'
import { useSelector } from 'react-redux';
import ChangePasswordRequest from './component/changePasswordRequest'
import PasswordVerification from './component/PasswordVerification'
import PostVerification from './component/PostVerification'
import ChangePassword from './component/ChangePassword'
import Toast from './component/Toast';
import { API_URL } from './config';
import WelcomeScreen from './component/WelcomeScreen';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const showLoader = useSelector((state) => state.loader.showLoader);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const location = useLocation();

  // setLoader is managed by redux, so you should use dispatch(setLoader(...)) in children
  const checkSession = async () => {
    try {
      const res = await fetch(`${API_URL}/api/EVENT/check-session`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoggedIn(data.loggedIn);
    } catch {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (loggedIn === false && !hasDismissed) {
      if (location.pathname === '/' || location.pathname === '/teacher_login') {
        setShowWelcome(true);
      } else {
        setShowWelcome(false);
      }
    } else {
      setShowWelcome(false);
    }
  }, [loggedIn, location.pathname, hasDismissed]);

  const handleWelcomeDismiss = () => {
    setHasDismissed(true);
    setShowWelcome(false);
  };

  return (
    <div className="body">
      <Toast />
      {showWelcome && <WelcomeScreen onDismiss={handleWelcomeDismiss} />}
      {showLoader && <Loader />}
      {loggedIn === null ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="*" element={loggedIn ? <Home /> : <Student_Login checkSession={checkSession} />} />
          <Route path="/teacher_login" element={loggedIn ? <Navigate to="/" /> : <Teacher_Login checkSession={checkSession} />} />
          <Route path="/verification" element={<VerificationCode checkSession={checkSession} />} />
          <Route path="/ChangePasswordRequest" element={<ChangePasswordRequest />} />
          <Route path="/PasswordVerification" element={<PasswordVerification />} />
          <Route path="/PostVerification" element={<PostVerification checkSession={checkSession} />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
