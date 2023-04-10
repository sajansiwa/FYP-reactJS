import NavBar from "./components/navbar";
import SignupForm from "./components/signup";
import SignInForm from "./components/signIn";
import Home from "./components/HomeComponent";
import { useSelector } from "react-redux";
import DrawerComponent from "./components/drawer";
import UserProfile from "./components/profile";
import Incomming from "./components/incomming";

import { initializeApp } from "firebase/app";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getFcmToken } from "./helpers/firebase_helpers";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  async function getPermission() {
    var response = await Notification.requestPermission();
    if (response == "granted" || response == "default") {
      const token = await getFcmToken();
      console.log(token);
    }
  }
  useEffect(() => {
    getPermission();
  }, []);
  return (
    <SnackbarProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/HomeComponent" element={<Home />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/incomming" element={<Incomming />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
