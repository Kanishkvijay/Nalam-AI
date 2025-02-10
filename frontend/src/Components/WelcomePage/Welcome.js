import React from "react";
import "./Welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const nav = useNavigate();
  return (
    <div>
      <div id="conatainer-1" className="container-fluid">
        {/* ROW-1*/}
        <div id="logo-row" className="row">
          <div
            id="logo"
            className="col d-flex justify-content-start align-items-center  ps-md-5"
          >
            NALAM AI
          </div>
        </div>
        {/* ROW-2*/}
        <div id="row2" className="row">
          <div
            id="Welcome-Text"
            className="col text-center d-flex flex-column justify-content-center align-items-center"
          >
            <h1>Welcome to NALAM AI HealthCare Tools</h1>
            <h2>
              Empowering you with advanced diagnostics and health insights.
            </h2>
            <button
              onClick={() => nav("/role")}
              type="button"
              class="btn btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
        {/*...FOOTER...*/}
        {/*...ROW-3...*/}
        <footer>
          <div id="footer-row" className="row">
            {/*...FOR DESKTOP's AND LAPTOP's AND TAB's*/}
            <div
              id="footer-col-1"
              className="col-4 d-flex justify-content-start align-items-center  ps-md-5"
            >
              <a>Support</a>
            </div>
            <div
              id="footer-col-2"
              className="col-4 text-center d-flex justify-content-center align-items-center"
            >
              <a>
                <FontAwesomeIcon
                  icon={faCopyright}
                  style={{ color: "#ffffff" }}
                />
                &nbsp;2024 NALAM AI
              </a>
            </div>
            <div
              id="footer-col-3"
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

export default Welcome;
