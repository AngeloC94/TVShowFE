import React, { useState, useEffect } from "react";
import "./CarouselHero.scss";

const CarouselHero = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === 4) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="carouselHero-container">
      <div className="carouselHero-content">
        <div className="carouselHero-items-wrapper">
          <div
            className="carouselHero-items"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselHero;
