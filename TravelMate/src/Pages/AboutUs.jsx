import React from "react";
import Admin from "../assets/Admin.jpg"

const AboutUs = () => {
  return (
    <div className="grid p-9 gap-20 grid-cols-1 md:grid-cols-[3fr_2fr]">
      <div className="mt-9 text-justify">
        <p className="">
          Hi! I am Anirudha Dhungana currently in undergraduate level at Herald
          College Kathmandu, University of Wolverhamption. As an IT student, I
          am highly motivated to constantly learn and explore new ideas in the
          field of Information Technology. I believe that continuous learning is
          essential for personal and professional growth. I actively seek out
          opportunities to expand my knowledge by utilizing various resources
          such as online platforms, books, and workshops.
        </p>

        <p className="mt-3">
          Learning new ideas in IT allows me to stay updated with emerging
          technologies, industry trends, and innovative concepts. It enables me
          to think critically, analyze different perspectives, and apply
          creative thinking in my projects. I embrace the dynamic nature of the
          IT industry and understand the importance of adapting to new
          technologies and ideas.
        </p>
        <p className="mt-3">
          I am open-minded and eager to collaborate with peers, mentors, and
          industry professionals. Engaging in discussions and participating in
          group projects allows me to gain diverse insights and perspectives. I
          value feedback and actively seek it to improve my skills and
          knowledge. By embracing continuous learning and exploring new ideas, I
          am well-equipped to tackle the challenges and contribute effectively
          to the ever-evolving field of Information Technology.
        </p>
      </div>
      <div>
        <img className="border border-primary rounded-2xl"
          src={Admin}
          alt="adminImage"
        />
      </div>
    </div>

    
  );
};

export default AboutUs;
