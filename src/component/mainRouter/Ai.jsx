import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../Store/eventSlice";
import AiEventCard from "./AiEventCard";
import "./RStyle/Ai.css";

const Ai = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.events);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchEvents({ page: 1, lite: true }));
    }
  }, [dispatch, list.length]);

  return (
    <div className="ai-hub-container">
      <div className="ai-hub-header">
        <h1 className="ai-hub-title">AI Command Center</h1>
        <p className="ai-hub-subtitle">
          Interact with intelligent agents for every event. Get answers instantly or broadcast updates with AI-powered tools.
        </p>
      </div>

      {loading ? (
        <div className="loader-container">
          <p style={{ textAlign: "center", color: "#64748b" }}>Initializing AI Nodes...</p>
        </div>
      ) : (
        <div className="ai-event-grid">
          {list.map((event, index) => (
            <AiEventCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Ai;
