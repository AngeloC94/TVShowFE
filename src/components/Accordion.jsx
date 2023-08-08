import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={handleAccordionClick}>
        <h2>{title}</h2>
        {isOpen ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default Accordion;
