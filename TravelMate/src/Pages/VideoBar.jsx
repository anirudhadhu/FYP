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
    <section className="about section ">
      <div className="secContainer">
        <div className="videoCard container">
          <div className="cardContent grid gap-4 sm:gap-8 py-6 sm:py-24 px-2 sm:px-6">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="cardText text-white"
            >
              <h2 className="font-bold text-xl sm:text-2xl">Wonderful mountain experience in there!</h2>
              <p className="opacity-70 text-sm sm:text-base">
                The adventure subranking based on an equally weighted average of
                scores from various destinations.
              </p>
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="cardVideo border-2 border-primaryColor rounded-2xl overflow-hidden"
            >
              <video
                src={Mountain}
                autoPlay
                loop
                muted
                className="h-full w-full object-cover"
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
