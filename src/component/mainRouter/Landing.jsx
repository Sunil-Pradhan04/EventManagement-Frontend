import Carousel from "./Carousel";
import "./RStyle/Landing.css";

const Landing = () => {
  const stars = Array.from({ length: 300 });

  const highlights = [
    "Easily create and manage college or corporate events.",
    "Instant enroll and register in events and clubs.",
    "Automated email & SMS updates.",
    "Live announcements and result updates.",
    "Chat with AI about events."
  ];

  return (
    <div className="landing">
      {/* Star Background */}
      <div className="star-bg">
        {stars.map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: Math.random() * 100 + "vh",
              left: Math.random() * 100 + "vw",
              animationDelay: Math.random() * 5 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* Left Content */}
      <div className="left">
        <div className="wel">Welcome to GEC EventHub</div>
        <Carousel />
      </div>

      {/* Right Highlights Section */}
      <div className="right">
        <div className="highlights-container">
          <h2 className="highlight-title">✨ For You</h2>
          <ul className="highlight-list">
            {highlights.map((item, index) => (
              <li key={index} className="highlight-item">
                <span className="icon">🚀</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
