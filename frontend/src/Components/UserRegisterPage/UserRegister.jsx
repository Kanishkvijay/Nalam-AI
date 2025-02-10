import React from "react";
import "./UserRegister.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterboxComp from "./RegisterboxComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

function UserRegister() {
  return (
    <div>
      {/*...Container - 1...*/}
      <div className="container-fluid">
        {/*...ROW*/}
        <div id="register-row" className="row">
          {/*...COL*/}
          <div
            id="register-col"
            className="col d-flex justify-content-start align-items-center  ps-md-5"
          >
            NALAM AI
          </div>
        </div>
      </div>
      {/*...Container - 2...*/}
      <div className="container-fluid">
        <div id="register-row-2" className="row">
          <div
            id="register-col-2"
            className="d-flex justify-content-center align-items-center w-100"
          >
            <RegisterboxComp></RegisterboxComp>
          </div>
        </div>
      </div>
      {/*...Container - 3...*/}
      <div className="container-fluid">
        <footer>
          <div id="register-footer-row" className="row">
            {/*...FOR DESKTOP's AND LAPTOP's AND TAB's*/}
            <div
              id="register-footer-col-1"
              className="col-4 d-flex justify-content-start align-items-center  ps-md-5"
            >
              <a>Support</a>
            </div>
            <div
              id="register-footer-col-2"
              className="col-4 text-center d-flex justify-content-center align-items-center"
            >
              <a>
                <FontAwesomeIcon
                  icon={faCopyright}
                  style={{ color: "rgba(9, 9, 117, 1)" }}
                />
                &nbsp;2024 NALAM AI
              </a>
            </div>
            <div
              id="register-footer-col-3"
              className="col-4 d-flex justify-content-end align-items-center  pe-md-5"
            >
              <a href="https://purushothaman-portfolio.web.app/">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default UserRegister;
