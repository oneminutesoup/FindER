import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import HospitalList from "../components/HospitalListItem";
import HospitalDetailsModal from "../components/HospitalDetailsModal";
import Sidebar from "../components/Sidebar";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { geocode } from "../components/geocode";
import ApiClient from "../components/ApiClient";
import { Person } from "../classes/Person";

function SecondPage({ address, gender, age, situation, response, setAdvice }) {
  console.log("Second page", address, gender, age, situation);
  const [hospitals, setHospitals] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendResp, setRecommendResp] = useState(response);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/hospitals")
  //     .then((response) => response.json())
  //     .then((data) => setHospitals(data.body))
  //     .catch((error) => console.error("Error fetching hospitals:", error));
  // }, []);

  const toggleIconStyle = {
    position: "fixed",
    left: sidebarVisible ? "300px" : "0", // Position next to the sidebar
    top: "50%",
    zIndex: "2",
    cursor: "pointer",
    transform: "translateY(-50%)",
    // Add more styles as needed
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleResubmit = async (formData) => {
    // get location
    setLoading(true);
    let latlng = await geocode(formData.address);
    let hospitals = await ApiClient.GetRecommendation(
      new Person(formData.age, formData.gender, formData.situation, latlng)
    );
    setRecommendResp(hospitals);
    console.log("Resubmit advice: ", hospitals[0]);
    setAdvice(hospitals[0]);
    setLoading(false);
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHospital(null);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh", // Fixed height of the whole page
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        style={{
          textAlign: "center",
          margin: "40px 0",
          width: "100%",
          maxWidth: "800px",
          fontSize: "2.5rem", // Smaller font size for the header
        }}
      >
        Our Recommendations
      </Typography>
      <IconButton onClick={toggleSidebar} style={toggleIconStyle}>
        {sidebarVisible ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
      </IconButton>

      <HospitalList
        hospitals={recommendResp[1]}
        onHospitalClick={handleHospitalClick}
        loading={loading}
      />
      <Sidebar
        isVisible={sidebarVisible}
        initialAddress={address}
        initialGender={gender}
        initialAge={age}
        situation={situation}
        onResubmit={handleResubmit}
        loading={loading}
      />
      {selectedHospital && (
        <HospitalDetailsModal
          open={isModalOpen}
          hospitalDetails={selectedHospital}
          onClose={handleCloseModal}
          urgent={response[2]}
        />
      )}
    </div>
  );
}

export default SecondPage;
