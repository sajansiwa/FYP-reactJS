import NavBar from "./components/navbar";
import SignupForm from "./components/signup";
import SignInForm from "./components/signIn";
import Home from "./components/HomeComponent";
import { useSelector } from "react-redux";
import DrawerComponent from "./components/drawer";
import UserProfile from "./components/profile";
import Incomming from "./components/incomming";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getFcmToken } from "./helpers/firebase_helpers";
import VerifyPage from "./pages/VerifyPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  // onMessage(messaging, (payload) => {
  //   console.log("Message received. ", payload);

  // });

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
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/verify" element={<VerifyPage />} />
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
