import React from "react";
import Admin from "../assets/Admin.jpg";
import Travel from "../assets/Travel.jpg";

const AboutUs = () => {
  return (
    <>
      <p className="px-9 mt-9 text-2xl font-semibold underline ">
        About TravelMate
      </p>
      <div className="grid p-9 gap-20 grid-cols-1 md:grid-cols-[2fr_2fr]">
        <p className="text-justify">
          TravelMate, a web application merging "Travel" and "Mate," aims to be
          a friendly companion for travelers, streamlining various services
          under one platform. Its motto, "Explore the world with ease," reflects
          its commitment to simplicity, creativity, and personalized user
          experiences. The primary goals include seamless trip planning, secure
          booking, continuous innovation, and user-friendly design. Many
          travelers face challenges planning and executing trips smoothly,
          despite a growing demand for personalized experiences. TravelMate
          seeks to address these issues by offering a comprehensive solution
          integrating planning, security, sustainability, and detailed
          information.
          <p className="text-justify mt-3">
          The project introduces features like document uploads to eliminate the
          need for carrying physical documents, user-friendly interfaces,
          integrated booking services, and budget-friendly tour packages. Scopes
          include user registration, destination information, friendly
          interfaces accessible across devices, booking services integration, Weather Forecast
          and currency conversion. However, there are limitations, such as
          dependence on external data, device compatibility, sustainable data
          accuracy, resource constraints for continuous improvements, and
          limitations with third-party APIs. TravelMate targets users above 18,
          primarily between ages 20 to 60, providing a seamless platform for
          booking travel packages and exploring the world. It utilizes React JS
          for frontend, Express and Node JS for backend, and MongoDB for data
          storage, aiming for a complete MERN stack implementation.
        </p>
        </p>
        <div>
          <img
            className="border border-primary rounded-2xl"
            src={Travel}
            alt="adminImage"
          />
        </div>
        
      </div>
      <p className="ml-10 mt-6 text-2xl font-semibold underline ">
        Founder of TravelMate:
      </p>
      <div className="grid px-9 gap-20 grid-cols-1 md:grid-cols-[2fr_2fr]">
        <div className="mt-9 text-justify">
          <p className="">
            Hi! I am Anirudha Dhungana currently in undergraduate level at
            Herald College Kathmandu, University of Wolverhamption. As an IT
            student, I am highly motivated to constantly learn and explore new
            ideas in the field of Information Technology. I believe that
            continuous learning is essential for personal and professional
            growth. I actively seek out opportunities to expand my knowledge by
            utilizing various resources such as online platforms, books, and
            workshops.
          </p>

          <p className="mt-3">
            Learning new ideas in IT allows me to stay updated with emerging
            technologies, industry trends, and innovative concepts. It enables
            me to think critically, analyze different perspectives, and apply
            creative thinking in my projects. I embrace the dynamic nature of
            the IT industry and understand the importance of adapting to new
            technologies and ideas.
          </p>
          <p className="mt-3">
            I am open-minded and eager to collaborate with peers, mentors, and
            industry professionals. Engaging in discussions and participating in
            group projects allows me to gain diverse insights and perspectives.
            I value feedback and actively seek it to improve my skills and
            knowledge. By embracing continuous learning and exploring new ideas,
            I am well-equipped to tackle the challenges and contribute
            effectively to the ever-evolving field of Information Technology.
          </p>
        </div>
        <div>
          <img
            className="border border-primary rounded-2xl"
            src={Admin}
            alt="adminImage"
          />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
