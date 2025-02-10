import React from "react";
import "./Chatbot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Searchbar from "./Searchbar";
import Response from "./Response";

function Chatbot() {
  return (
    <div>
      {/*...Container - 1...*/}
      <div className="container-fluid">
        {/*...ROW*/}
        <div id="chatbot-row" className="row">
          {/*...COL*/}
          <div
            id="chatbot-col"
            className="col d-flex justify-content-start align-items-center  ps-md-5"
          >
            NALAM AI
          </div>
        </div>
      </div>
      {/*...Container - 2...*/}
      <div className="container-fluid">
        {/*...ROW - 2*/}
        <div id="chatbot-row2" className="row">
          {/*...COL - 2*/}
          <div
            id="chatbot-col2"
            className="col d-flex flex-column justify-content-end align-items-center"
          >
            <h1>What can i help with?</h1>
            <Searchbar></Searchbar>
          </div>
        </div>
        {/*...ROW - 3*/}
        <div id="chatbot-footer-row" className="row">
          {/*...COL - 3*/}
          <div
            id="chatbot-footer-col"
            className="col d-flex flex-column justify-content-center align-items-center pt-3 pb-0"
          >
            <p>Powered by Nalam AI</p>
          </div>
        </div>
      </div>
      {/*...Container - 3...*/}
      {/* <footer>
        <div className="container -fluid">
          <div id="chatbot-footer-row" className="row">
            <div
              id="chatbot-footer-col"
              className="col d-flex flex-column justify-content-center align-items-center pt-3 pb-0"
            >
              <p>Powered by Nalam AI</p>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default Chatbot;
