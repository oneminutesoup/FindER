async function geocodeAddress(address) {
  const AHS = require("../AHS/AHS");
  const ahs = new AHS();
  const dotenv = require("dotenv");
  dotenv.config();

  const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API_KEY;
  const fetch = (await import("node-fetch")).default;
  const urlAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_MAPS_API}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      return { lat: NaN, lng: NaN };
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to be handled by the caller
  }
}

// (async () => {
//   const address = "University of Alberta, Edmonton, Canada";
//   try {
//     const { lat, lng } = await geocodeAddress(address);
//     console.log(lat, lng);
//   } catch (error) {
//     console.error("Error retrieving coordinates:", error);
//   }
// })();

module.exports = { geocodeAddress };
