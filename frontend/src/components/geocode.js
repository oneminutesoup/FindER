

async function geocode(address) {
    const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    console.log(address);
    if (!address) { throw new Error("Empty address"); }
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Geocoding API error: " + data);
    }
  } catch (error) {
    console.error("Error: coulnd't get lat lng", error);
    return {
      lat: 53.523220,
      lng: -113.526321,
    };
  }
}

// Example usage
/*
(async () => {
  const addressToGeocode = "1600 Amphitheatre Parkway, Mountain View, CA";
  try {
    const coordinates = await geocode(addressToGeocode);
    console.log(coordinates);
  } catch (error) {
    console.error("Error retrieving coordinates:", error.message);
  }
})();
*/

module.exports = { geocode };