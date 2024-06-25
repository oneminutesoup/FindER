const { geocodeAddress } = require("./geocode");
const hospital_info = require("../GPT/hospital_info.json");
const fs = require("fs").promises; // Use the promises version of fs

let hospital_lat_lng = {};
let promises = [];

for (let key in hospital_info) {
  promises.push(
    geocodeAddress(key)
      .then(({ lat, lng }) => {
        hospital_lat_lng[key] = { lat, lng };
      })
      .catch((error) => {
        console.error("Error retrieving coordinates for:", key, error);
      })
  );
}

// Wait for all promises to resolve
Promise.all(promises)
  .then(() => {
    // Convert the hospital_lat_lng object into a JSON string
    const jsonContent = JSON.stringify(hospital_lat_lng, null, 2);

    // Write the JSON string to a file
    fs.writeFile("hospital_lat_lng.json", jsonContent, "utf8")
      .then(() => {
        console.log("hospital_lat_lng.json has been saved.");
      })
      .catch((error) => {
        console.error("An error occurred while writing JSON to file:", error);
      });
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
