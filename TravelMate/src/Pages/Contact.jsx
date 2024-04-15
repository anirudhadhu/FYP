import React, { useRef } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (form.current.checkValidity()) {
      emailjs
        .sendForm(
          "service_ewexzus",
          "template_fo4svei",
          form.current,
          "sFjtyoMHdDJXOJq1Y"
        )
        .then((result) => {
          console.log(result.text);
        })
        .catch((error) => {
          console.log(error.text);
        });
      e.target.reset();
    } else {
      form.current.reportValidity();
    }
  };

  return (
    <section className="contact section bg-gray-100 py-16" id="contact">
      {/* <h2 className="section__title text-3xl font-bold mb-8 text-center"></h2> */}

      <div className="contact__container container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="contact__content">
          <h3 className="contact__title text-xl font-semibold mb-4">
            Get in touch
          </h3>
          <div className="contact__info">
            {/* Email */}
            <div className="contact__card mb-4">
              <h3 className="contact__card-title text-lg font-semibold mb-2">
                📩 Email
              </h3>
              <a
                href="mailto:anirudradhungana@gmail.com"
                className="contact__button inline-block px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-200 transition duration-300"
              >
                Write ✍️
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact__card mb-4">
              <h3 className="contact__card-title text-lg font-semibold mb-2">
                💬 WhatsApp
              </h3>
              <a
                href="https://api.whatsapp.com/send?phone=9779866407633&text=Hello,%20more%20information!"
                className="contact__button inline-block px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-200 transition duration-300"
              >
                Write ✍️
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact__content">
          <h3 className="contact__title text-xl font-semibold mb-4 underline">
            Write us your Question/Suggestion/problem:
          </h3>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="contact__form space-y-4"
          >
            <div className="contact__form-div">
              <label htmlFor="name" className="contact__form-tag">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="contact__form-input block w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Insert your full name"
                required
              />
            </div>

            <div className="contact__form-div">
              <label htmlFor="email" className="contact__form-tag">
                Mail:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="contact__form-input block w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Insert your Email address"
                required
              />
            </div>

            <div className="contact__form-div">
              <label htmlFor="message" className="contact__form-tag">
                Message/Query:
              </label>
              <textarea
                id="message"
                name="message"
                cols="30"
                rows="5"
                className="contact__form-input block w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Write here"
                required
              ></textarea>
            </div>
            <button className=" flex gap-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    height="18"
                    width="18"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
