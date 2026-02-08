import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../Store/notificationSlice";
import "./style/Toast.css";

const Toast = () => {
    const dispatch = useDispatch();
    const { message, type, isVisible } = useSelector((state) => state.notification);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3500); // Auto hide after 3.5 seconds

            return () => clearTimeout(timer);
        }
    }, [isVisible, dispatch]);

    if (!isVisible) return null;

    return (
        <div className={`toast-container ${type} show`}>
            <div className="toast-icon">
                {type === "success" && "✓"}
                {type === "error" && "✕"}
                {type === "info" && "ℹ"}
            </div>
            <div className="toast-message">{message}</div>
            <button className="toast-close" onClick={() => dispatch(hideToast())}>
                ×
            </button>
        </div>
    );
};

export default Toast;
