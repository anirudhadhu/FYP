import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../Styles/Scroll.css";

const Scroll = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    setShowButton(scrollTop > 0);
  };

  const scrollToTop = () => {
    if (showButton) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FaArrowUp
      onClick={scrollToTop}
      className={showButton ? "FaArrowUp show" : "FaArrowUp hide"}
    />
  );
};

export default Scroll;
