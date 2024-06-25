import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Loader from "./Loader";

function HospitalList({ hospitals, onHospitalClick, loading }) {
  // Styles for the card, including transition properties for smooth effects
  const cardStyle = {
    borderRadius: "15px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    margin: "10px auto", // Reduced space between cards
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition for hover effect
  };

  // Hover effect styles
  const hoverEffect = {
    transform: "scale(1.03)", // Slightly enlarge the card
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)", // Increase the shadow for a glow effect
  };

  const listContainerStyle = {
    overflowY: "scroll", // Enable vertical scrolling
    maxHeight: "calc(100vh - 160px)", // Adjust the height as needed to fit your header/footer
    width: "100%",
    maxWidth: "900px",
    paddingTop: "10px", // Use the passed paddingTop value
    paddingBottom: "20px",
    boxSizing: "border-box",
    height: "100%",
  };

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div className="listContainer" style={listContainerStyle}>
      {" "}
      {/* This div is the scrollable list container */}
      {!loading &&
        hospitals.map((hospital, index) => (
          <Card
            key={index}
            style={cardStyle}
            onClick={() => onHospitalClick(hospital)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = hoverEffect.transform;
              e.currentTarget.style.boxShadow = hoverEffect.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
            className="hospitalCard"
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                style={{ fontSize: "1.3rem", color: "#333" }}
              >
                {hospital.name}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.1rem", color: "#555" }}
              >
                Distance: {hospital.distance.text} - Wait Time:{" "}
                {hospital.waitTime.hours} hours {hospital.waitTime.minutes} mins
              </Typography>
            </CardContent>
          </Card>
        ))}
      {loading && (
        <div style={loadingStyle}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default HospitalList;
