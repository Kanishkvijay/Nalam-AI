import React from "react";
import "./Searchbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

function Searchbar() {
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-end">
        {/*...ROW*/}
        <div
          id="Searchbar-row"
          className="row d-flex justify-content-center align-items-center"
        >
          {/*...COL*/}
          <div id="Searchbar-col" className="col">
            <div id="searchbar">
              <textarea
                type="search"
                name="Searchbar"
                placeholder="Get insights and advice from Nalam AI."
              />
              <button>
                <FontAwesomeIcon
                  icon={faCircleArrowUp}
                  size="xl"
                  style={{ color: "#000000" }}
                />
              </button>
            </div>
          </div>
          {/*...COL - 2*/}
          <div className="col d-flex justify-content-start align-items-center gap-3">
            {/*...UPLOAD OPTION*/}
            <div id="searchbar-options">
              <input type="file" id="fileInput" style={{ display: "none" }} />
              <button id="upload">
                <span>
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    style={{ color: "#000000" }}
                  />
                </span>
                Upload
              </button>
            </div>
            {/*...UPLOAD OPTION-2*/}
            <div id="searchbar-options">
              <button id="upload">
                <span>
                  <FontAwesomeIcon
                    icon={faMicrophone}
                    style={{ color: "#000000" }}
                  />
                </span>
                Voice Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
