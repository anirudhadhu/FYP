import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the root component with <BrowserRouter> for client-side routing
  <React.StrictMode>
    <BrowserRouter>     
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// The ReactDOM.createRoot function creates a new React root and returns a Root object, which has a render method that you use to render the application's root component.
// document.getElementById("root") finds the HTML element with the id "root" where the application will be rendered.
// The <BrowserRouter> component from react-router-dom is used to enable client-side routing in your application.
// The <React.StrictMode> component is used to wrap your application, enabling strict mode. This helps catch common mistakes and makes the code more resilient.
// Finally, the App component, which serves as the root component of your application, is rendered within the <BrowserRouter> component.