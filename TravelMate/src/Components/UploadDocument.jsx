import React, { useState, useEffect } from "react";
import axios from "axios";
import sampleImage from "../assets/sampleImage.jpg";

const UploadDocument = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUploadedDocuments = async () => {
    try {
      const response = await axios.get("/documents");
      setUploadedFiles(response.data || []);
    } catch (error) {
      console.error("Fetch documents error:", error);
      setError("An error occurred while fetching the documents.");
    }
  };

  useEffect(() => {
    fetchUploadedDocuments();
  }, []); // Fetch documents on component mount

  const uploadPhoto = async (ev) => {
    try {
      setIsLoading(true);
      setError(null);

      const files = ev.target.files;
      const data = new FormData();

      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }

      const response = await axios.post("/documents", data, {
        headers: { "Content-type": "multipart/form-data" },
      });

      setUploadedFiles(response.data || []);
    } catch (error) {
      console.error("Upload error:", error);
      setError("An error occurred while uploading the document.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-9 ml-9">
      {error && <div className="text-red-500">{error}</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : uploadedFiles.length > 0 ? (
        <div className="mt-6">
          <p className="font-semibold">Your Document:</p>
          {uploadedFiles.map((file, index) => (
            <div key={index}>
              {/* <p className="font-semibold">Document {index + 1}:</p> */}
              {file.documents.map((documentPath, docIndex) => (
                <img
                  key={docIndex}
                  src={`/documents/${documentPath}`}
                  alt={`Document ${index + 1}`}
                  className="mt-3"
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="font-semibold">
            Upload your National ID, Citizenship, Passport, or any government
            document which identifies you.
          </p>
          <label className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent mt-4 rounded-2xl border-primary p-2 text-gray-600">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload from device
          </label>
          <p className="mt-6 font-semibold">
            Sample Document:
            <img className="mt-3" src={sampleImage} alt="SampleImage" />
          </p>
          <p className="mt-3 text-justify">
            By uploading the document you can get rid of carrying your various
            documents with you in case of bookings.
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
