import "../Styles/Footer.css";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, Navigate } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 15000 });
  }, []);

  return (
    <div data-aos="fade-up" className="footer">
      <div className="secContainer container grid">
        <div className="logoDiv">
          <div className="footerLogo">
            <a href="" className="logo flex">
              <h1 className="flex">TravelMate</h1>
              <span></span>
            </a>
          </div>

          <div className="socials flex">
            <a
              href="https://www.facebook.com/profile.php?id=100015630391721"
              target="_blank"
            >
              <FaFacebookF className="icon" />
            </a>
            <a href="https://twitter.com/anirudha_dh" target="_blank">
              <FaTwitter className="icon" />
            </a>
            <a href="https://www.instagram.com/anirudha.dh/" target="_blank">
              <FaInstagram className="icon" />
            </a>
          </div>

          <div className="dhungana">&#169; All rights reserved 2024</div>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">Information</span>
          <li>
            <Link to={"/"} href="/terms">
              Home{" "}
            </Link>
          </li>

          <li>
            <Link to={"/contact"} href="/terms">
              Contact Us{" "}
            </Link>
          </li>

          <li>
            <Link to={"/terms"} href="/terms">
              Terms and Condition{" "}
            </Link>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">Utilities</span>
          <li>
            <Link to={"/CurrencyConvert"} href="/terms">
              Currency Conversion{" "}
            </Link>
          </li>
         
        </div>

        {/* <div className="footerLinks">
          <span className="linkTitle">Contact Us</span>
          <span className="phone">+91 1234567890</span>
          <span className="email">hbj@example.com</span>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
