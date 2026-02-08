import React, { useEffect, useRef, useState } from "react";
import "./RStyle/Carousel.css";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const Navigate = useNavigate();

  const cards = [
    {
      name: "Clubs",
      img: "Clubs.jpg",
    },
    { name: "Events",
      img: "Events.jpg",
     },
    { name: "Ai",
      img: "Ai.jpg",
     },
    { name: "Profile",
      img: "Profile.jpg",
     },
  ];

  const updateCarousel = () => {
    const cardElements = carouselRef.current.children;
    const length = cards.length;

    for (let i = 0; i < length; i++) {
      const card = cardElements[i];
      const offset = (i - currentIndex + length) % length;

      // Reset base styles
      card.style.opacity = "0";
      card.style.transform = "translateX(0) rotateY(0) scale(0.8)";

      if (offset === 0) {
        // Center
        card.style.transform = "translateZ(150px) scale(1)";
        card.style.opacity = "1";
      } else if (offset === 1) {
        // Right
        card.style.transform = "translateX(200px) rotateY(-40deg) scale(0.8)";
        card.style.opacity = "0.7";
      } else if (offset === length - 1) {
        // Left
        card.style.transform = "translateX(-200px) rotateY(40deg) scale(0.8)";
        card.style.opacity = "0.7";
      }
    }
  };

  // Update transforms when index changes
  useEffect(() => {
    if (carouselRef.current) updateCarousel();
  }, [currentIndex]);

  // Start auto scroll safely
  const startAutoScroll = () => {
    // Prevent multiple intervals
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Manual navigation handlers
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    restartAutoScroll();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    restartAutoScroll();
  };

  // Restart interval safely
  const restartAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <button className="left-btn" onClick={handlePrev}>
        ‹
      </button>

      <div className="carousel" ref={carouselRef}>
        {cards.map((num, index) => (
          <div key={index} className="card" onClick={() => Navigate(`/${num.name}`)}>
            <div className="img" style={{ backgroundImage: `URL(${num.img})` }}></div>
            <div className="bottom">
              <span className="text">{num.name}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="right-btn" onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default Carousel;
