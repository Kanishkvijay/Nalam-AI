import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Welcome from "./Components/WelcomePage/Welcome";
import Usertype from "./Components/UsertypePage/Usertype";
import UserRegister from "./Components/UserRegisterPage/UserRegister";
import UserLogin from "./Components/UserLoginPage/UserLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/role" element={<Usertype />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/register" element={<UserRegister />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// BootStrap 5 and Rect BootStrap is Installed
// GSAP is not Installed(Need to download)
