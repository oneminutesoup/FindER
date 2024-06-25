require("dotenv").config();
const {Client, PlaceInputType} = require("@googlemaps/google-maps-services-js");
const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API_KEY
const client = new Client({});
function getLocation(){
    client
    .findPlaceFromText({
    params: {
      input: "University of Alberta",
      inputtype:PlaceInputType.textQuery,
      key: GOOGLE_MAPS_API,
    },
    timeout: 2000, 
  })
  .then((r) => {
    saved = r.data.candidates[0].place_id
    console.log(r.data);
    client.placeDetails({
        params: {
            place_id: saved,
            key: GOOGLE_MAPS_API

        },
        timeout:3000
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })

  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });   
}
getLocation()

