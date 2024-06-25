import React, { useEffect, useState } from "react";
import PermissionAlert from "../components/PermissionAlert";
import PermissionGranted from "../components/PermissionGranted";
import Loader from "../components/Loader";
import Form from "../components/Form";
import "./screen.css";
import { reverseGeocode } from "../components/reverse_geocode.js";
import VoiceAnimation from "../components/VoiceAnimation.js";
import completeVoice from "../sounds/Complete.mp3";

const Home = ({
  addressHandler,
  genderHandler,
  situationHandler,
  submitHandler,
  ageHandler,
  geolocationHandler,
  updateCaption,
  updateAdvice,
}) => {
  const [permissionDenied, setPermissionDenied] = useState(true);
  const [locationPermission, setLocationPermission] = useState(true);
  const [loading, setLoading] = useState(true);
  const [permissionPage, setPermissionPage] = useState(true);
  const [address, setAddress] = useState("");
  const [speechInput, setSpeechInput] = useState(""); // user's voice input

  const endPermissionPage = () => {
    setPermissionPage(false);
  };

  async function micPermission() {
    await navigator.permissions
      .query({ name: "microphone" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          setPermissionDenied(false);
        }
      });
  }

  async function geoPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissionStatus.state === "granted") {
        // Using a Promise to handle getCurrentPosition since it's not natively async
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        geolocationHandler({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        const currentAddress = await reverseGeocode(
          position.coords.latitude,
          position.coords.longitude,
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        );

        setAddress(currentAddress);
        setLocationPermission(false);
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error getting geolocation permission:", error);
      // Handle error (e.g., user denied geolocation permission)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  const updateSpeech = (text) => {
    setSpeechInput(text);
  };

  const handlePermission = () => {
    setPermissionDenied(true);
    const completeAudio = new Audio(completeVoice);
    completeAudio.play();
  };

  // check if user has given permission to use microphone and location
  useEffect(() => {
    micPermission();
    geoPermission();
  }, []);

  return (
    <div className="home">
      {permissionPage ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* check if location is not empty */}
              {locationPermission || permissionDenied ? (
                <PermissionAlert handleButton={endPermissionPage} />
              ) : (
                <PermissionGranted
                  handleButton={endPermissionPage}
                  updateCaption={updateCaption}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {locationPermission || permissionDenied ? (
            <Form
              addressHandler={addressHandler}
              genderHandler={genderHandler}
              situationHandler={situationHandler}
              address={address}
              submitHandler={submitHandler}
              ageHandler={ageHandler}
              situation={speechInput}
            />
          ) : (
            <VoiceAnimation
              showForm={handlePermission}
              updateSpeech={updateSpeech}
              updateCaption={updateCaption}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
