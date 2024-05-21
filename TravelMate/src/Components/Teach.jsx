import React from "react";

const Teach = () => {
  return (
    <div className="p-9">
      <h1 className="text-2xl text-center font-semibold mb-6 underline">
        TravelMate User Guide
      </h1>
      <div className="grid gap-20 p-12 grid-cols-1 md:grid-cols-[1fr_1fr]">
        <section className="mb-8 border-r border-primary rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <p className="mb-4">
            Welcome to TravelMate! Here's a quick guide to get started:
          </p>
          <ol className="list-disc list-inside">
            <li>Create an account or log in if you already have one.</li>
            <li>
              Email Verification link will be sent to your registered email
              address
            </li>
            <li>Explore destinations listed in TravelMate.</li>
            <li>Select your desired destination and view details.</li>
            <li>Book your destination by following the booking process.</li>
            <li>Make a payment via stripe</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <p className="mb-4">TravelMate offers the following features:</p>
          <ul className="list-disc list-inside">
            <li>Browse and search for destinations.</li>
            <li>Sort destinations by price.</li>
            <li>
              View destination details including title, address, price and many
              more.
            </li>
            <li>Book destinations securely.</li>
            <li>Upload your document </li>
            <li>Be a travel agent </li>
          </ul>
        </section>
      </div>

      <div className="grid gap-20 p-12 grid-cols-1 md:grid-cols-[1fr_1fr]">
        <section className=" border-r border-primary rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Tips</h2>
          <p className="mb-4">
            Here are some tips to enhance your TravelMate experience:
          </p>
          <ul className="list-disc list-inside">
            <li>
              Use the sorting feature to find destinations within your budget.
            </li>
            <li>
              Upload attractive photos when listing a destination to attract
              more travelers.
            </li>
            <li>Regularly check for new destinations added to TravelMate.</li>
            <li>
              Upload your documents so that you can get rid of carrying the
              document an loose the fear of lossing them.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Teach;
