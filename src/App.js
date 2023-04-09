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
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

export let firebaseApp;

const App = () => {
  useEffect(() => {
    firebaseApp = initializeApp(firebaseConfig);
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

export const firebaseConfig = {
  apiKey: "AIzaSyBY-cy02eGUphORAPYztuu9d9akron71tI",
  authDomain: "hospital-1dad3.firebaseapp.com",
  projectId: "hospital-1dad3",
  storageBucket: "hospital-1dad3.appspot.com",
  messagingSenderId: "602731118828",
  appId: "1:602731118828:web:04dcfd5a8c31f1750e65c9",
  measurementId: "G-FSZKXREGVC",
};

export default App;
