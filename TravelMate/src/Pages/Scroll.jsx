import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../Styles/Scroll.css";

const Scroll = () => {
  const [showButton, setShowButton] = useState(false); // State to manage the visibility of the scroll button

  // Function to handle scroll events
  const handleScroll = () => {
    // Get the vertical scroll position of the page
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setShowButton(scrollTop > 0); // Update the state to show the scroll button if scrollTop > 0
  };

  // Function to scroll to the top of the page when the button is clicked
  const scrollToTop = () => {
    // Check if the button should be visible and scroll to top if true
    if (showButton) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling animatio
      });
    }
  };

  // Effect hook to add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  return (
    <FaArrowUp
      onClick={scrollToTop}
      className={showButton ? "FaArrowUp show" : "FaArrowUp hide"}
    />
  );
};

export default Scroll;

// State Management: It uses the useState hook to manage the state of whether to display the scroll button (showButton).

// Scroll Event Listener: The handleScroll function is called whenever the user scrolls the page. It determines whether to show the scroll button based on the scroll position.

// Smooth Scrolling: The scrollToTop function is triggered when the scroll button is clicked. It scrolls the page to the top using window.scrollTo with a smooth animation effect.

// Effect Hook: The useEffect hook is used to add and remove the scroll event listener when the component mounts and unmounts, respectively.

// Rendering: The component renders a FaArrowUp icon from react-icons/fa library. The visibility of the icon is controlled by the showButton state.

// CSS Styling: The visibility of the scroll button is toggled using CSS classes (show and hide) based on the showButton state.
