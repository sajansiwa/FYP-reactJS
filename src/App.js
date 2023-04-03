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

const App = () => {
  // const LoginStatus = useSelector((state) => state.auth.isLoggedin);
  // console.log("app state:", LoginStatus);

  return (
    <div>
      <Router>
        <NavBar />
        {/* {if (!LoginStatus) {<NavBar />} } */}
        <Routes>
          <Route path="/HomeComponent" element={<Home />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/incomming" element={<Incomming />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
