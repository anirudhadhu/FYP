import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Admin/Navbar";

const UserDocument = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents from the server
    axios
      .get("http://localhost:4000/alldocuments")
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const handleDeleteDocument = async (documentId, documentIndex) => {
    try {
      // Make a delete request to remove the document
      await axios.delete(`http://localhost:4000/documents/${documentId}`);
  
      // Update the documents state by removing the deleted document
      setDocuments((prevDocuments) => {
        const updatedDocuments = [...prevDocuments];
        updatedDocuments.splice(documentIndex, 1); // Remove the deleted document from the array
        return updatedDocuments;
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="p-9">
      <Navbar />
      <h1 className="text-2xl text-center underline p-6 font-semi mb-4">
        All Documents
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((document, documentIndex) => (
          <div key={document._id}>
            <h2 className="text-lg font-semibold mb-2">
              User ID: {document.userName}
            </h2>
            <div className="p-4 border border-gray-200 rounded-md relative">
              {document.documents.map((documentPath, docIndex) => (
                <div key={docIndex} className="relative">
                  <a href={`http://localhost:4000/documents/${documentPath}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`http://localhost:4000/documents/${documentPath}`}
                      alt={`Document ${docIndex + 1}`}
                      className="mt-3 object-cover w-full h-64 rounded-md cursor-pointer"
                    />
                  </a>
                  {/* Delete icon */}
                  <button
                    onClick={() =>
                      handleDeleteDocument(document._id, documentIndex)
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 cursor-pointer focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDocument;
