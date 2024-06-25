async function reverseGeocode(lat, lng, key) {
  const GOOGLE_MAPS_API_KEY = key;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      return data.results[0].formatted_address;
    } else {
      // Corrected error message construction
      return `Reverse Geocoding API error: ${data.status}`;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error so it can be caught by the caller
  }
}

module.exports = { reverseGeocode };
