const hospitalInfo = require("./hospital_info.json");

/////////////////////// Define Functions Start ///////////////////////

/*
    Name: checkUrgency
    Description: This function checks whether the situation is urgent or not. This is important because down the pipeline, if it is urgent, we'll send the patient to the nearest hospital, and if not, we'll send the patient based on the total time needed.
    Parameters:
        - gender (str): "male" or "female"
        - age (int): 0-99
        - situation (str): description of emergency situation (ex. symptoms)
    Returns: "urgent" or "non-urgent" 
*/
checkUrgency = async (
  gender = "unknown",
  age = "unknown",
  situation = "unknown"
) => {
  try {
    // initialization
    const OpenAI = require("openai");
    require("dotenv").config();
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // prompt
    const message = `The patient's gender is ${gender}, and the age is ${age}. ${situation}. Classify whether this is critical (emergency prioritizes the patient) or non-critical (subject to wait time) in the Canadian emergency system. Your output must be either 'urgent' or 'non-urgent'.`;

    // use gpt
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      temperature: 0,
      max_tokens: 5,
    });
    return response.choices[0].message.content;
  } catch (err) {
    return err.message;
  }
};

/*
    Name: checkFirstResponse
    Description: This function suggests to the user what to do as a first response before reaching the emergency or before it arrives.
    Parameters:
        - gender (str): "male" or "female"
        - age (int): 0-99
        - situation (str): description of emergency situation (ex. symptoms)
    Returns: Description of what to do in 3-5 points 
*/
checkFirstResponse = async (
  gender = "unknown",
  age = "unknown",
  situation = "unknown"
) => {
  try {
    // initialization
    const OpenAI = require("openai");
    require("dotenv").config();
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // prompt
    const message = `The patient's gender is ${gender}, and the age is ${age}. They are seeking medical attention and this is the situation that they have described (it may be blank): ${situation}. Give the best advice for them to do until they arrive to the hospital. Format the response that provides helpful tip to the user specific to their situation if not blank. Keep the response concise to two to three sentences.`;

    // use gpt
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      temperature: 0,
      max_tokens: 70,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.log(err.message);
    return "Consult a medical practitioner";
  }
};

/*
    Name: checkServices
    Description: This function examines the services of a hospital of interest and checks whether or not it could deal with the situation.
    Parameters:
        - gender (str): "male" or "female"
        - age (int): 0-99
        - situation (str): description of emergency situation (ex. symptoms)
        - hospital_name (str): name of hospital
    Returns: "yes" if it can deal with the situation or "no" if it cannot.
*/
checkServices = async (
  gender = "unknown",
  age = "unknown",
  situation = "unknown",
  //   hospital_name = "Innisfail Health Centre"
  services
) => {
  // let services = [];
  try {
    // services = hospitalInfo[hospital_name]["services"];

    try {
      const OpenAI = require("openai");
      require("dotenv").config();
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const message = `The patient's gender is ${gender}, and the age is ${age}. ${situation}. And the services provided by the emergency are the following: ${services}. Would this emergency be able to resolve the situation? Your output must be either 'yes' or 'no'.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
        temperature: 0,
        max_tokens: 5,
      });
      return response.choices[0].message.content;
    } catch (err) {
      return err.message;
    }
  } catch (error) {
    console.error("Error reading the file:", error);
  }
};

// export these functions
module.exports = { checkUrgency, checkFirstResponse, checkServices };

/////////////////////// Define Functions End ///////////////////////

/////////////////////// Test Functions Start ///////////////////////

// sample use of checkUrgency function
async function testUrgency() {
  try {
    let urgency = await checkUrgency("male", 63, "tummy ache and mouth bleeds");
    console.log(urgency);
  } catch (error) {
    // This will catch any errors thrown by the checkUrgency function
    console.error("Error:", error);
  }
}

// sample use of checkFirstResponse function
async function testFirstResponse() {
  try {
    let firstResponse = await checkFirstResponse(
      "male",
      63,
      "i think my legs just got cut off but i can still walk"
    );
    console.log(firstResponse);
  } catch (error) {
    console.log("Error:", error);
  }
}

// sample use of checkServices function
async function testServices() {
  try {
    let serviceApplicable = await checkServices(
      "male",
      63,
      "tummy ache and mouth bleeds",
      "Innisfail Health Centre"
    );
    console.log(serviceApplicable);
  } catch (error) {
    console.log("Error:", error);
  }
}

/////////////////////// Test Functions End ///////////////////////

/*
// Call the testUrgency function
testUrgency();

// Call the testFirstResponse function
testFirstResponse();

// Call the testServices function
testServices();
*/
