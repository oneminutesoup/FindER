import React from "react";
import "./components.css";

const PermissionGranted = ({ handleButton, updateCaption }) => {
  return (
    <div className="card-permission">
      <div className="header">
        <div className="image-granted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#000000"
                d="M20 7L9.00004 18L3.99994 13"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className="content-granted">
          <span className="title-granted">Permission granted</span>
          <p className="message-permission">
            Thanks for enabling permissions. Let's get started!
          </p>
        </div>
        <div className="actions">
          <button
            type="button"
            className="reload"
            onClick={() => {
              handleButton();
              updateCaption(
                "Welcome to FindER! We guide you to the optimal emergency room quickly, ensuring timely and efficient care. Press 'Start' to begin."
              );
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionGranted;
