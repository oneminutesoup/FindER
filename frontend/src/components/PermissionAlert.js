import React, { useEffect } from "react";
import "./components.css";

const PermissionAlert = ({ handleButton }) => {
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Permission Granted" + stream);
    } catch (error) {
      // Handle the error (e.g., permission denied)
    }
  };
  const requestLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Position obtained
        },
        (error) => {
          // Handle the error (e.g., permission denied)
        }
      );
    } else {
      // Geolocation is not supported by this browser
    }
  };

  const handleMicrophoneAccess = async () => {
    await requestMicrophonePermission();
  };

  const handleLocationAccess = () => {
    requestLocationPermission();
  };

  useEffect(() => {
    handleLocationAccess();
    handleMicrophoneAccess();
  });

  return (
    <div className="card-permission">
      <div className="header">
        <div className="image-permission">
          <p style={{ color: "white" }}>X</p>
        </div>
        <div className="content-permission">
          <span className="title-permission">Permission Requested</span>
          <p className="message-permission">
            For a quicker response and effortless input, please enable location
            and microphone permissions for this app.
          </p>
        </div>
        <div className="actions">
          <button
            type="button"
            className="reload-permission"
            onClick={handleButton}
          >
            Continue without
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionAlert;
