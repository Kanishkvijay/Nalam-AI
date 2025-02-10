import React from "react";
import "./Usertype.css";
import "bootstrap/dist/css/bootstrap.min.css";
import User3D from "./User3D.png";
import Doctor3D from "./Doctor3D.png";
import Admin3D from "./Admin3D.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Usertype() {
  const nav = useNavigate();
  return (
    <div>
      {/*...Container - 1...*/}
      <div className="container-fluid">
        {/*...ROW*/}
        <div id="role-row" className="row">
          {/*...COL*/}
          <div
            id="role-col"
            className="col d-flex justify-content-start align-items-center  ps-md-5"
          >
            NALAM AI
          </div>
        </div>
      </div>
      {/*...Container - 2...*/}
      <div className="container-fluid">
        {/*...ROW-1*/}
        <div id="role-row-1" className="row">
          {/*...COL-1*/}
          <div
            id="role-col-1"
            className="col-12  d-flex justify-content-center align-items-center"
          >
            <h1>Select Your Role</h1>
          </div>
          {/*...COL-2*/}
          <div className="col-12 col-sm-4 d-sm-flex justify-content-sm-start align-items-sm-center d-flex justify-content-center align-items-center ps-md-5 pb-4 pb-sm-0">
            {/*...Card-1 - Doctor  */}
            <div id="card-1-main" className="card" style={{ width: "18rem" }}>
              <img src={Doctor3D} className="card-img-top" alt="Doctor"></img>
              <div id="Doctorcard" className="card-body">
                {/* <h5 className="card-title">Card title</h5> */}
                <p className="card-text">Healing with heart and expertise.</p>
                <a href="#" className="btn btn-white">
                  Doctor
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 d-flex justify-content-center align-items-center pt-4 pb-4 pt-sm-0 pb-sm-0">
            {/*...Card-2 - User  */}
            <div id="card-1-main" className="card" style={{ width: "18rem" }}>
              <img src={User3D} className="card-img-top" alt="User"></img>
              <div id="Usercard" className="card-body">
                {/* <h5 className="card-title">Card title</h5> */}
                <p className="card-text">Health at your fingertips.</p>
                <a
                  onClick={() => nav("/login")}
                  href="#"
                  className="btn btn-white"
                >
                  User
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 d-sm-flex justify-content-sm-end align-items-sm-center d-flex justify-content-center align-items-center pe-md-5 pt-4 pb-4 pt-sm-0 pb-sm-0">
            {/*...Card-3 - Admin  */}
            <div id="card-1-main" className="card" style={{ width: "18rem" }}>
              <img src={Admin3D} className="card-img-top" alt="Admin"></img>
              <div id="Admincard" className="card-body">
                {/* <h5 className="card-title">Card title</h5> */}
                <p className="card-text">
                  Where organization meets excellence.
                </p>
                <a href="#" className="btn btn-white">
                  Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <footer>
          <div id="role-footer-row" className="row">
            {/*...FOR DESKTOP's AND LAPTOP's AND TAB's*/}
            <div
              id="role-footer-col-1"
              className="col-4 d-flex justify-content-start align-items-center  ps-md-5"
            >
              <a>Support</a>
            </div>
            <div
              id="role-footer-col-2"
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
              id="role-footer-col-3"
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

export default Usertype;
