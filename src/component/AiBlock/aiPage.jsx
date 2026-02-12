import { useState, useRef, useEffect } from "react";
import "./aiPage.css";
import { API_URL } from "../../config";
import { useSelector } from "react-redux";

const EventAIChat = ({ event, setAiVisible }) => {
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      msg: `Hey! I’m the ${event?.Ename} AI Assistant. Ask me anything about the event. 😊`,
    },
  ]);
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [AiLanguage, setAiLanguage] = useState("english");
  const [remaining, setRemaining] = useState(null); // Null means unknown or unlimited

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (user && !isAdmin && user.aiQuestionCount !== undefined) {
      setRemaining(20 - user.aiQuestionCount);
    }
  }, [user, isAdmin]);

  const sendMessage = async () => {
    if (!userMsg.trim()) return;
    const text = userMsg.trim();
    setUserMsg("");

    setMessages((prev) => [...prev, { sender: "user", msg: text }]);
    setLoading(true);

    try {
      const resp = await fetch(`${API_URL}/api/EVENT/chatWithAi`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, Ename: event?.Ename, language: AiLanguage }),
      });
      console.log("AI Response:", resp);

      const data = await resp.json();

      // Update remaining count if provided
      if (data.remainingQuestions !== undefined && data.remainingQuestions !== "Unlimited") {
        setRemaining(data.remainingQuestions);
      }

      if (resp.status === 403) {
        setMessages((prev) => [...prev, { sender: "AI", msg: data.response }]);
        setRemaining(0);
        setLoading(false);
        return;
      }

      const reply = data.response || "Sorry, I couldn't fetch an answer. Please try again.";

      let showText = "";
      for (let char of reply) {
        showText += char;
        await new Promise((res) => setTimeout(res, 25));
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.sender === "AI-typing") {
            last.msg = showText;
          } else {
            updated.push({ sender: "AI-typing", msg: showText });
          }
          return updated;
        });
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].sender = "AI";
        return updated;
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", msg: "Sorry, something went wrong. Try again?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Determine limit color
  const getLimitColor = () => {
    if (remaining === null || isAdmin) return "#4caf50"; // Green (safe)
    if (remaining > 10) return "#4caf50";
    if (remaining > 0) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-container">
        <div className="chat-header">
          <div className="header-title">
            <span className="ai-icon">✦</span>
            <h2>{event?.Ename} AI</h2>
          </div>

          <div className="header-controls">
            {!isAdmin && remaining !== null && (
              <div className="limit-indicator" style={{ borderColor: getLimitColor(), color: getLimitColor() }}>
                {remaining} left
              </div>
            )}

            <select
              className="language-select"
              value={AiLanguage}
              onChange={(e) => setAiLanguage(e.target.value)}
            >
              <option value="english">EN</option>
              <option value="hindi">HI</option>
              <option value="odia">OD</option>
            </select>

            <button className="close-btn" onClick={() => setAiVisible(false)}>
              ✕
            </button>
          </div>
        </div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`message-bubble ${m.sender === "user" ? "user-message" : "ai-message"
                } ${m.sender === "AI-typing" ? "typing" : ""}`}
            >
              {m.msg}
            </div>
          ))}

          {loading && (
            <div className="message-bubble ai-message typing-indicator">
              <span>Thinking</span>
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <textarea
            placeholder={remaining === 0 ? "Ask about 'Rules' (Unlimited)..." : "Ask anything..."}
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!userMsg.trim() || loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventAIChat;