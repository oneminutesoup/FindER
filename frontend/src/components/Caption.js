import React from "react";
import AWS from "aws-sdk";

const Caption = ({ caption, advice, updateCaption }) => {
  const polly = new AWS.Polly({});

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_API_KEY,
    region: "us-east-1", // Change to your region
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    updateCaption(advice);

    const params = {
      Text: `<speak>
        <prosody rate="fast">${advice}</prosody>
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

  return (
    <div class="card-caption" onClick={handleSubmit}>
      <div class="card-image-caption">
        <p>Click to listen to the advice</p>
      </div>
      <div class="card-description-caption">
        <p class="text-title-caption"> Caption</p>
        <p class="text-body-caption">{caption}</p>
      </div>
    </div>
  );
};

export default Caption;
