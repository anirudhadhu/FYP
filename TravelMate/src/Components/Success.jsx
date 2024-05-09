import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  const downloadPdf = () => {
    // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
    const pdfUrl = "/path/to/your-pdf-file.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "your-pdf-file.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-14 mt-10">
      <div className="text-center text-2xl underline text-green-500 font-semibold">
        Your payment is successful.
      </div>
      <p className="text-center text-sm p-2">
        Thank you for booking with TravelMate.
      </p>

      <div className="flex justify-center mt-4">
        <button
          className="bg-primary flex gap-2 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={downloadPdf}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
          Download your booking information
        </button>
      </div>
      <div className="p-2 text-sm flex justify-center gap-1">
        Please go through TravelMate's{" "}
        <Link className="underline font-semibold" to={"/terms"}>
          Terms and Conditions
        </Link>
      </div>
    </div>
  );
};

export default Success;
