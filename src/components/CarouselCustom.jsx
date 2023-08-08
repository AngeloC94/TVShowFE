import React, { useState } from "react";
import "./Carousel.scss"

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;

  const next = () => {
  if (currentIndex === 6) {
    setCurrentIndex(0);
  } else {
    setCurrentIndex(currentIndex + 1);
  }

};


  const prev = () => {
    if (currentIndex === 0) {
        setCurrentIndex(6);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
      console.log(length)
      console.log(currentIndex)
  };

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <button className="carousel-arrow prev" onClick={prev}>
          &#8249;
        </button>
        <div className="carousel-items-wrapper">
          <div
            className="carousel-items"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {children}
          </div>
        </div>
        <button className="carousel-arrow next" onClick={next}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
