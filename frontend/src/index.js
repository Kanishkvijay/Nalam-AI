import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Welcome from "./Components/WelcomePage/Welcome";
import Usertype from "./Components/UsertypePage/Usertype";
import UserLogin from "./Components/UserLoginPage/UserLogin";
import Chatbot from "./Components/ChatbotPage/Chatbot";
import Searchbar from "./Components/ChatbotPage/Searchbar";
import Response from "./Components/ChatbotPage/Response";
import LoginboxComp from "./Components/UserLoginPage/LoginboxComp";
import UserRegister from "./Components/UserRegisterPage/UserRegister";
import RegisterboxComp from "./Components/UserRegisterPage/RegisterboxComp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {
      // <Welcome></Welcome>
      // <Usertype></Usertype>
      // <UserLogin></UserLogin>
      // <Chatbot></Chatbot>
      // <Searchbar></Searchbar>
      // <Response></Response>
      <App />
      // <LoginboxComp></LoginboxComp>
      // <UserRegister></UserRegister>
      // <RegisterboxComp></RegisterboxComp>
    }
  </React.StrictMode>
);

reportWebVitals();
