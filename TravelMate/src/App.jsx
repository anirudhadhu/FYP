import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './Pages/ProfilePage';
import PlacesPage from './Pages/PlacesPage';
import PlacesFormPage from './Pages/PlacesFormPage';
import PlacePageHome from './Pages/PlacePageHome';

// Set base URL for Axios
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account" element={<ProfilePage />} />
                    <Route path="/account/places" element={<PlacesPage />} />
                    <Route path="/account/places/new" element={<PlacesFormPage />} />
                    <Route path="/account/places/:id" element={<PlacesFormPage />} />
                    <Route path="/place/:id" element={<PlacePageHome />} />        
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
