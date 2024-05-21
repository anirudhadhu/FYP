import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Creating a context to manage user data
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  // State variables to store user data and loading state
  const [user, setUser] = useState(null); // Initially set to null
  const [ready, setReady] = useState(false); // Indicates whether user data is ready

  // Fetch user data from the API when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the '/profile' endpoint using Axios
        const { data } = await axios.get("/profile");
        setUser(data);
        setReady(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if user data is not already fetched before calling fetchUserData
    if (!user) {
      fetchUserData();
    }
  }, [user]); // Dependency array ensures useEffect runs only when user changes

  // Providing the UserContext to its children components with user data and loading state
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
