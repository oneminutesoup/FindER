async function reverseGeocode(lat, lng) {
  const dotenv = require("dotenv");
  dotenv.config();

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  const fetch = (await import("node-fetch")).default;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      return data.results[0].formatted_address;
    } else {
      return "Reverse Geocoding API error:", data.status;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// example usage
/*
(async () => {
  const latitude = 40.714224;
  const longitude = -73.961452;
  try {
    const address = await reverseGeocode(latitude, longitude);
    console.log(address);
  } catch (error) {
    console.error("Error retrieving address:", error);
  }
})();
*/
module.exports = { reverseGeocode };
