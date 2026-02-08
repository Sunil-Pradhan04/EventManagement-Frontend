import React, { useState, useEffect } from "react";
import { FaTimes, FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import "./RStyle/EnrollmentList.css";
import { API_URL } from "../../config";

const EnrollmentList = ({ eventName, onClose }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchEnrollments = async (pageNum) => {
        try {
            setLoading(true);
            const res = await fetch(
                `${API_URL}/api/EVENT/getEventEnrollments/${eventName}?page=${pageNum}&limit=${limit}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (res.ok) {
                if (pageNum === 1) {
                    setEnrollments(data.enrollments);
                } else {
                    setEnrollments((prev) => [...prev, ...data.enrollments]);
                }

                if (pageNum >= data.totalPages) {
                    setHasMore(false);
                }
            }
        } catch (err) {
            console.error("Error fetching enrollments:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments(1);
    }, [eventName]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchEnrollments(nextPage);
    };

    return (
        <div className="enrollment-overlay" onClick={onClose}>
            <div className="enrollment-container" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="enrollment-header">
                    <div className="header-title">
                        <h3>{eventName}</h3>
                        <p className="header-subtitle">{enrollments.length} Participants Enrolled</p>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* List Body */}
                <div className="enrollment-body">
                    {enrollments.length === 0 && !loading ? (
                        <div className="empty-state" style={{ textAlign: "center", color: "#64748b", marginTop: "3rem" }}>
                            <p>No enrollments found yet.</p>
                        </div>
                    ) : (
                        <div className="enrollment-grid">
                            {enrollments.map((user, index) => (
                                <div key={index} className="user-card">
                                    <div className="user-avatar">
                                        <FaUser />
                                    </div>
                                    <div className="user-details">
                                        <h4 className="user-name">{user.userName}</h4>
                                        <span className="user-email">
                                            <FaEnvelope /> {user.UserEmail}
                                        </span>
                                    </div>
                                    <div className="joined-date">
                                        <FaCalendarAlt style={{ marginRight: 5, fontSize: "0.7em" }} />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer Controls */}
                    <div className="list-footer">
                        {loading && (
                            <div className="loading-dots">
                                <span></span><span></span><span></span>
                            </div>
                        )}

                        {!loading && hasMore && enrollments.length > 0 && (
                            <button onClick={loadMore} className="load-more-btn">
                                Load More
                            </button>
                        )}

                        {!hasMore && enrollments.length > 0 && (
                            <p style={{ color: "#475569", fontSize: "0.8rem" }}>End of list</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentList;
