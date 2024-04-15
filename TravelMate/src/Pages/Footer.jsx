import "../Styles/Footer.css";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

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
              <h1 className="flex">
                TravelMate
              </h1>
              <span></span>
            </a>
          </div>

          <div className="socials flex">
            <FaFacebookF className="icon" />
            <FaTwitter className="icon" />
            <FaInstagram className="icon" />
          </div>
          <div className="dhungana">&#169; All rights reserved 2024</div>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel </a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Helpful Links</span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel and Condition </a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">Contact Us</span>
          <span className="phone">+91 1234567890</span>
          <span className="email">hbj@example.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
