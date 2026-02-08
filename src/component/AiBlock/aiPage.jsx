import { useState, useRef, useEffect } from "react";
import "./aiPage.css";
import { API_URL } from "../../config";

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

  const chatEndRef = useRef(null);

  const removeEmojis = (text) => {
    return text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
      ""
    );
  };



  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-container">
        <div className="chat-header">
          <div className="header-title">
            <span className="ai-icon">✦</span>
            <h2>{event?.Ename} AI Assistant</h2>
          </div>

          <div className="header-controls">

            <select
              className="language-select"
              value={AiLanguage}
              onChange={(e) => setAiLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="hindi">हिन्दी</option>
              <option value="odia">ଓଡ଼ିଆ</option>
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
            placeholder="Ask anything about the event..."
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