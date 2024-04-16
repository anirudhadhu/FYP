import React from "react";
import "../Styles/VideoBar.css";
import Mountain from "../assets/clips/Mountain.mp4";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const VideoBar = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="about section">
      <div className="secContainer">
        <div className="videoCard container">
          <div className="cardContent grid">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="cardText"
            >
              <h2>Wonderful mountain expreience in there!</h2>
              <p>
                The adventure subranking based on an equally weighted average of
                scores from various destinations.
              </p>
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="cardVideo"
            >
              <video
                src={Mountain}
                autoPlay
                loop
                muted
                type="video/mp4"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBar;
