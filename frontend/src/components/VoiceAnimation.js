import React, { useState, useEffect } from "react";
import introVoice from "../sounds/Intro.mp3";
import situationVoice from "../sounds/Situation.mp3";
import SkipButton from "./SkipButton";

const voices = [introVoice, situationVoice];

const VoiceAnimation = ({ showForm, updateSpeech, updateCaption }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [buttonAppear, setButtonAppear] = useState(false);
  const audioRef = React.useRef(null); // Reference to the audio object

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(voices[voiceIndex]);
    audioRef.current.play();
    setIsPlaying(true);

    // Event listener for when the audio ends
    const handleAudioEnd = async () => {
      setIsPlaying(false);
      // take user's voice input
      if (voiceIndex === 1) {
        handleVoiceInput();
      } else if (voiceIndex !== 0) {
        handleVoiceInput();
      } else {
        setButtonAppear(true);
      }
    };
    audioRef.current.addEventListener("ended", handleAudioEnd);

    // Cleanup function to remove the event listener
    return () => {
      audioRef.current.removeEventListener("ended", handleAudioEnd);
      audioRef.current.pause(); // Pause the audio when component unmounts or voice changes
    };
  }, [voiceIndex]); // Dependency on voiceIndex

  const handleClick = () => {
    // Stop the current audio immediately
    updateCaption(
      "Could you breifly describe your current situation and condition? Your details will help us guide you to the right care. "
    );
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset the audio playback to the start
    setButtonAppear(false);

    // take user's voice input
    setVoiceIndex((prevIndex) => prevIndex + 1);
  };

  // function that take user's voice input and stop when user stop talking
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.start();

    // check if user stops talking for 1 seconds stop the recognition
    recognition.onspeechend = () => {
      recognition.stop();
      if (voiceIndex === 1) {
        showForm();
        updateCaption(
          "Please review the details you just shared to ensure accuracy. Once everything is correct, go ahead and press submit."
        );
      } else {
        setVoiceIndex((prevIndex) => prevIndex + 1);
      }
    };

    //  store the user's voice input
    recognition.onresult = (e) => {
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      updateSpeech(transcript);
    };
  };

  return (
    <>
      <div className={`voice`}>
        <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
        <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
        <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
        <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      </div>
      {buttonAppear ? (
        <button className="start-button" onClick={handleClick}>
          {" "}
          Get Started
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="start-svg"
          >
            <path
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      ) : (
        <></>
      )}
      <div className="skip-holder">
        <SkipButton clickHandler={showForm} updateCaption={updateCaption} />
      </div>
    </>
  );
};

export default VoiceAnimation;
