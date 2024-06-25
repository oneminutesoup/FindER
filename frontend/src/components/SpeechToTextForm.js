import AWS from "aws-sdk";
import React from "react";
import { useState } from "react";

const SpeechToTextForm = () => {
  const polly = new AWS.Polly({});
  const [formData, setFormData] = useState("");

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_API_KEY,
    region: "us-east-1", // Change to your region
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    const params = {
      Text: `<speak>
        <prosody rate="x-fast">Welcome to find ER, the smart solution for managing emergency room patient distribution!</prosody>
        </speak>`,
      OutputFormat: "mp3",
      VoiceId: "Danielle",
      Engine: "long-form",
      TextType: "ssml",
    };

    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        // play audio returned in data.AudioStream
        const uInt8Array = new Uint8Array(data.AudioStream);
        const arrayBuffer = uInt8Array.buffer;
        const blob = new Blob([arrayBuffer]);
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      }
    });
  };

  const handleChange = (event) => {
    setFormData(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={formData}
        onChange={handleChange}
        placeholder="Type something here..."
      />
      <button type="submit">Speak</button>
    </form>
  );
};

export default SpeechToTextForm;
