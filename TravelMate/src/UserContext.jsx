import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get('/profile');
                setUser(data);
                setReady(true);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (!user) {
            fetchUserData();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}