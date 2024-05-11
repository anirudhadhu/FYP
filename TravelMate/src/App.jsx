import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./Pages/ProfilePage";
import PlacesPage from "./Pages/PlacesPage";
import PlacesFormPage from "./Pages/PlacesFormPage";
import PlacePageHome from "./Pages/PlacePageHome";
import BookingsPage from "./Pages/BookingsPage";
import BookingPage from "./Pages/BookingPage";
import Favorites from "./Pages/Favorites";
import Contact from "./Pages/Contact";
import TermsAndCondition from "./Components/TermsAndCondition";
import CurrencyConvert from "./Pages/CurrencyConvert";
import AboutUs from "./Pages/AboutUs";
import Weather from "./Pages/Weather";
import Success from "./Components/Success";
import Cancle from "./Components/Cancle";
import AdminHomePage from "./Admin/AdminHomePage";
import Destination from "./Admin/Destination";
import UserDocument from "./Admin/UserDocument";
import Users from "./Admin/Users";
import ViewBookings from "./Admin/ViewBookings";
import EmailVerification from "./Components/EmailVerification";
import ResetPasswordPage from "./Components/ResetPasswordPage";
import SearchReasult from "./Pages/SearchReasult";
import SortPlaces from "./Pages/SortPlaces";
import News from "./Pages/News"

// Setting base URL for Axios
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePageHome />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/terms" element={<TermsAndCondition />} />
          <Route path="/CurrencyConvert" element={<CurrencyConvert />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancle" element={<Cancle />} />
          <Route path="/news" element={<News />} />
          <Route path="/search/:destination" element={<SearchReasult />} />
          <Route path="/sort-places" element={<SortPlaces />} />
          <Route path="/verify/:verificationToken" element={<EmailVerification />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        </Route>
        <Route path="/AdminHomePage" element={<AdminHomePage />} />
        <Route path="/Destination" element={<Destination />} />
        <Route path="/UserDocument" element={<UserDocument />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/ViewBookings" element={<ViewBookings />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
