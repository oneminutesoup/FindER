import React, { useState } from 'react';
// import Form from './Form'; // Import the Form component

function SidebarContent({ initialAddress, initialGender, initialAge, initialSituation, onResubmit, loading }) {
    const initAddress = typeof initialAddress === 'string' ? initialAddress : "";
    const initAge = initialAge == 0 || initialAge  ? initialAge : "";

    const [address, setAddress] = useState(initAddress);
    const [gender, setGender] = useState(`${initialGender}`);
    const [age, setAge] = useState(initAge);
    const [situation, setSituation] = useState(`${initialSituation}`);
    
    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '35px', // Increased gap for better spacing between sections
      padding: '20px',
      paddingTop: '60px',
    };
  
    const inputTextStyle = {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      background: '#f8f8f8',
      fontFamily: 'Arial, sans-serif',
      fontSize: '1rem',
    };
  
    const labelStyle = {
      marginBottom: '5px',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      lineHeight: '1.5',
    };
  
    const textareaStyle = {
      ...inputTextStyle,
      overflowY: 'auto',
      resize: 'none',
    };
  
    const radioGroupStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    };

    const handleSubmit = () => {
        onResubmit({ address, gender, age, situation });
      };
  
    return (
      <div style={contentStyle}>
        <div>
          <p style={labelStyle}>Current Location<span>*</span></p>
          <textarea
            style={{ ...textareaStyle, height: '60px' }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            rows={3}
          ></textarea>
        </div>
        <div>
        <p style={labelStyle}>What is the individual's birth assigned gender?<span>*</span></p>
        <div style={radioGroupStyle}>
          {["female", "male", "other", "prefer not to disclose"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={(e) => setGender(e.target.value)}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize the first letter */}
            </label>
          ))}
        </div>
      </div>
        <div>
          <p style={labelStyle}>Age<span>*</span></p>
          <input
            type="number"
            style={inputTextStyle}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <p style={labelStyle}>Please describe the emergency situation:<span>*</span></p>
          <textarea
            style={{ ...textareaStyle, height: '100px' }} // Larger height for situation description
            rows="5"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Describe the situation"
          ></textarea>
        </div>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', marginTop: '20px' }} disabled={loading} >
            Resubmit
        </button>
      </div>
    );
}  
  

function Sidebar({ isVisible, initialAddress, initialGender, initialAge, initialSituation, onResubmit, loading }) {
    const sidebarStyle = {
        height: '100vh',
        width: isVisible ? '300px' : '0', // Control width based on visibility
        position: 'fixed',
        zIndex: '1',
        top: '0',
        left: isVisible ? '0' : '-300px', // Slide in from the left
        backgroundColor: '#fff', // White background
        overflowX: 'hidden',
        transition: '0.5s',
        padding: isVisible ? '20px' : '0',
      };

  return (
    <div style={sidebarStyle}>
      <SidebarContent
        initialAddress={initialAddress}
        initialGender={initialGender}
        initialAge={initialAge}
        initialSituation={initialSituation}
        onResubmit={onResubmit}
        loading={loading}
      />
    </div>
  );
}

export default Sidebar;
