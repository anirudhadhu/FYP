import React, { useState, useEffect } from "react";
import axios from "axios";
import sampleImage from "../assets/sampleImage.jpg";

const UploadDocument = () => {
  // State variables for uploadedFiles, isLoading, and error
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch uploaded documents from the server
  const fetchUploadedDocuments = async () => {
    try {
      const response = await axios.get("/documents");
      setUploadedFiles(response.data || []);
    } catch (error) {
      console.error("Fetch documents error:", error);
      setError("An error occurred while fetching the documents.");
    }
  };

  // useEffect hook to fetch uploaded documents when component mounts
  useEffect(() => {
    fetchUploadedDocuments();
  }, []);

  // Function to handle uploading documents
  const uploadPhoto = async (ev) => {
    try {
      setIsLoading(true);
      setError(null);

      const files = ev.target.files;
      const data = new FormData();

      // Append each file to FormData object
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }

      // Send POST request to upload documents
      const response = await axios.post("/documents", data, {
        headers: { "Content-type": "multipart/form-data" },
      });

      // Update state with uploaded file
      setUploadedFiles(response.data || []);

      // Refresh the page after successful upload
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error);
      setError("An error occurred while uploading the document.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-9 ml-9">
      {/* Display error message if there's an error */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display loading message if isLoading is true */}
      {isLoading ? (
        <div>Loading...</div>
      ) : uploadedFiles.length > 0 ? (
        // Display uploaded documents if there are any
        <div className="mt-6">
          <p className="font-semibold underline">Your Documents:</p>

          {/* Map through uploadedFiles array and display each document */}
          {uploadedFiles.map((file, index) => (
            <div key={index}>
              <p className="font-semibold">Document {index + 1}:</p>
              {/* Map through documents array in each file object and display images */}
              {file.documents.map((documentPath, docIndex) => (
                <img
                  key={docIndex}
                  src={`http://localhost:4000/documents/${documentPath}`}
                  alt={`Document ${index + 1}`}
                  className="mt-3"
                />
              ))}
            </div>
          ))}
          {/* Button to upload documents from device */}
          <label className="mt-5 h-32 cursor-pointer flex items-center justify-center gap-1 border border-primary bg-transparent rounded-2xl p-2 text-gray-600">
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
          <p className="text-red-500 mt-3">
            If your document is unclear you must re-upload.
          </p>
        </div>
      ) : (
        // Display upload section if no documents are uploaded
        <div>
          <p className="font-semibold">
            Upload your National ID, Citizenship, Passport, or any government
            document which identifies you.
          </p>
          <label className="mt-5 h-32 cursor-pointer flex items-center justify-center gap-1 border border-primary bg-transparent rounded-2xl p-2 text-gray-600">
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
          {/* Display a sample image */}
          <div className="p-2">
            Sample Image:
            <img src={sampleImage} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
