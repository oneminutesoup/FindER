import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const moment = require('moment');


function HospitalDetailsModal({ open, hospitalDetails, onClose, urgent }) {
  const conversion = (hospitalDetails,urgent) => {
    let m = moment()
    if (urgent) {
      
      const durationMs = hospitalDetails.duration.value*1000;
      console.log("durationMs when urgent",durationMs)
      m.add(durationMs, 'ms');
    } else {
      const waitingTimeMs = hospitalDetails.waitTime.hours * 3600*1000 +
                           hospitalDetails.waitTime.minutes * 60*1000 + hospitalDetails.duration.value*1000
      const totalTimeMs = waitingTimeMs;
      console.log("durationMs when not urgent",totalTimeMs)
      m.add(totalTimeMs, 'ms');
    }

    return m.calendar();
  }
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500, // Adjust width as necessary
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px', // Rounded corners
    overflowY: 'auto', // Ensuring content is scrollable if it exceeds modal height
    maxHeight: '80vh', // Increased max height
  };

  const titleStyle = {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '1.8rem', // Even larger font size
    color: '#333', // Optionally, a darker color for more emphasis
  };

  const fieldTitleStyle = {
    fontWeight: 'bold', // Bold for the field titles
    display: 'inline',
  };

  const fieldValueStyle = {
    display: 'inline',
    marginLeft: '5px', // Small space between title and value
  };

  const infoStyle = {
    marginBottom: '15px', // Increased space between lines
  };

  const servicesContainerStyle = {
    maxHeight: '200px', // Increased height for services container
    overflowY: 'auto',
    marginTop: '10px',
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
    backgroundColor: '#ffffff', // Clear white background
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Adding some shadow for depth
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <IconButton 
            onClick={onClose} 
            style={{ 
            position: 'absolute', 
            right: '10px', 
            top: '10px', 
            color: 'red' 
            }}
            aria-label="close"
        >
            <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" style={titleStyle}>{hospitalDetails.name}</Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Distance:</span>
          <span style={fieldValueStyle}>{hospitalDetails.distance.text}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Wait Time:</span>
          <span style={fieldValueStyle}>{hospitalDetails.waitTime.hours} hrs {hospitalDetails.waitTime.minutes} mins</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Travel Time:</span>
          <span style={fieldValueStyle}>{hospitalDetails.duration.text}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Estimate time for treatment:</span>
          <span style={fieldValueStyle}>{conversion(hospitalDetails,urgent)}</span>
        </Typography>

        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Note:</span>
          <span style={fieldValueStyle}>{hospitalDetails.note}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Type:</span>
          <span style={fieldValueStyle}>{hospitalDetails.type}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>City:</span>
          <span style={fieldValueStyle}>{hospitalDetails.city}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Phone:</span>
          <span style={fieldValueStyle}>{hospitalDetails.phone}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Address:</span>
          <span style={fieldValueStyle}>{hospitalDetails.address}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Website:</span>
          <a href={hospitalDetails.website} target="_blank" rel="noopener noreferrer" style={fieldValueStyle}>{hospitalDetails.website}</a>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Availability:</span>
          <span style={fieldValueStyle}>{hospitalDetails.availability}</span>
        </Typography>
        <Typography variant="body1" style={infoStyle}>
          <span style={fieldTitleStyle}>Age Group:</span>
          <span style={fieldValueStyle}>{hospitalDetails.age}</span>
        </Typography>
        <Typography variant="body1" component="h3" style={infoStyle}>
          <span style={fieldTitleStyle}>Services:</span>
        </Typography>
        <div style={servicesContainerStyle}>
          {hospitalDetails.services.map((service, index) => (
            <Typography key={index} variant="body1" style={infoStyle}>{service}</Typography>
          ))}
        </div>
      </Box>
    </Modal>
  );  
}

export default HospitalDetailsModal;
