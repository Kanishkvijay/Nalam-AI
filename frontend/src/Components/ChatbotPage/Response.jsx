import React from "react";
import "./Response.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Response() {
  return (
    <div>
      <div className="container">
        <div id="response-row" className="row">
          <div
            id="response-col"
            className="col d-flex justify-content-center align-items-center"
          >
            <textarea
              name="response"
              placeholder="Chatbot response will appear here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response;
