import React, { useState, useRef } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

export default function SwitchButton({ onClick }) {
  const [theme, setTheme] = useState("light");
  const [isActive, setIsActive] = useState(true);
  const toggleButtonRef = useRef();
  const toggleCircleRef = useRef();

  const handleToggleButtonClick = () => {
    toggleCircleRef.current.classList.toggle("slide");
    // const newTheme = theme === "light" ? "dark" : "light";
    // setTheme(newTheme);
    if (document.body.classList === "dark-theme") {
      document.body.classList.toggle("light-theme");
    } else  document.body.classList.toggle("dark-theme");
   
    // onClick && onClick(newTheme);
    setIsActive((prev) => !prev);
  };

  return (
    <>
      <div className="toggle-bar">
        {/* <div className="sun-wrapper">
          <BsFillSunFill
            opacity={isActive ? 0.7 : 0.3}
            size={30}
            color={isActive ? "black" : "white"}
          />
        </div> */}
        <button
          className="toggle-button"
          ref={toggleButtonRef}
          onClick={handleToggleButtonClick}
        >
          <div className="toggle-circle" ref={toggleCircleRef} />
        </button>
        {/* <div className="moon-wrapper">
          <BsFillMoonFill
            opacity={isActive ? 0.3 : 0.8}
            size={25}
            color={isActive ? "black" : "white"}
          />
        </div> */}
      </div>
    </>
  );
}
