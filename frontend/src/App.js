import Home from "./screens/Home";
import SecondPage from "./screens/HospitalList";
import "./styles.css";
import { useEffect, useState } from "react";
import { Person } from "./classes/Person";
import ApiClient from "./components/ApiClient";
import { geocode } from "./components/geocode";
import HoldOnVoice from "./sounds/HolnOn.mp3";
import Loader from "./components/Loader";
import Caption from "./components/Caption";
import ReadyVoice from "./sounds/Ready.mp3";

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

function App() {
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [situation, setSituation] = useState("");
  const [age, setAge] = useState("");
  const [submit, setSubmit] = useState(false);
  const [geolocation, setGeolocation] = useState({});
  const [response, setResponse] = useState([{}]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [transitionPage, setTransitionPage] = useState(false);
  const [caption, setCaption] = useState(".....");
  const [responseUpdated, setResponseUpdated] = useState(false);
  const [advice, setAdvice] = useState("");

  const updateAdvice = (advice) => {
    setAdvice(advice);
  };

  const updateCaption = (caption) => {
    setCaption(caption);
  };

  const addressHandler = (address) => {
    setAddress(address);
  };

  const genderHandler = (gender) => {
    setGender(gender);
  };

  const situationHandler = (situation) => {
    setSituation(situation);
  };

  const ageHandler = (age) => {
    setAge(age);
  };

  const geolocationHandler = (geolocation) => {
    setGeolocation(geolocation);
  };

  const submitHandler = async (age, gender, address, situation) => {
    const holdOnAudio = new Audio(HoldOnVoice);
    holdOnAudio.play();
    updateCaption(
      "Please hold on while we compile a list of ER rooms suitable for your needs."
    );
    setTransitionPage(true);

    if (typeof address === "string") {
      // switch address to geolocation
      let result = await geocode(address);
      console.log(result);
      const person = new Person(age, gender, situation, result);
      console.log(person);
      console.log(geolocation);
      let apiResult = await ApiClient.GetRecommendation(person);
      const readyAudio = new Audio(ReadyVoice);
      holdOnAudio.pause();
      readyAudio.play();
      updateAdvice(apiResult[0]);
      setResponse(apiResult);
    } else {
      const person = new Person(age, gender, situation, address);
      console.log(person);
      console.log(geolocation);
      // perform api call here!
      let apiResult = await ApiClient.GetRecommendation(person);
      setResponse(apiResult);
    }

    setTransitionPage(false);
    setSubmit(true);
    updateCaption(
      "The list of ER rooms is now ready for you. Please proceed to view your options."
    );
  };

  return (
    <div className="container">
      <div className="caption">
        <Caption
          caption={caption}
          advice={advice}
          updateCaption={updateCaption}
        />
      </div>
      {transitionPage && (
        <div className="home">
          <Loader />
        </div>
      )}

      {!transitionPage && (
        <>
          {!submit ? (
            <Home
              addressHandler={addressHandler}
              genderHandler={genderHandler}
              situationHandler={situationHandler}
              submitHandler={submitHandler}
              ageHandler={ageHandler}
              geolocationHandler={geolocationHandler}
              updateCaption={updateCaption}
              updateAdvice={updateAdvice}
            />
          ) : (
            <SecondPage
              address={address}
              gender={gender}
              situation={situation}
              age={age}
              response={response}
              setAdvice={setAdvice}
            />
          )}
          ;
        </>
      )}
    </div>
  );
}

export default App;
