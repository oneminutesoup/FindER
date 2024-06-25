personalAssistant = async (conversationHistory) => {
  try {
    // initialization
    const OpenAI = require("openai");
    require("dotenv").config();
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const directive =
      "Please provide clear and direct assistance without assuming or adding any details not provided by the user. Do not output what the patient would have said. Don't be apologetic, but be more clear and concise. Do not say you understand.";

    conversationHistory.push({ role: "system", content: directive });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory,
      temperature: 0,
      max_tokens: 150,
      stop: ["\n"],
    });
    const botMessage = response.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: botMessage });
    return { response: botMessage, updatedHistory: conversationHistory };
  } catch (err) {
    return { response: err.message, updatedHistory: conversationHistory };
  }
};

// sample usage
async function testPersonalAssistant() {
  try {
    // initialization
    let conversationHistory = [];
    let gender = "male";
    let age = 25;
    let situation = "he's bleeding";
    let firstMessage = `The patient's gender is ${gender}, and the age is ${age}. ${situation}. You need to be the emergency assistant as the patient will have conversations with you.`;
    conversationHistory.push({ role: "user", content: firstMessage });

    // first interaction
    let response1 = await personalAssistant(conversationHistory);
    console.log(response1.response);
    conversationHistory = response1.updatedHistory;

    // second interaction
    let secondMessage = "What should I do right now?";
    conversationHistory.push({ role: "user", content: secondMessage });
    let response2 = await personalAssistant(conversationHistory);
    console.log(response2.response);

    // third interaction
    let thirdMessage = "I am bleeding from my mouth.";
    conversationHistory.push({ role: "user", content: thirdMessage });
    let response3 = await personalAssistant(conversationHistory);
    console.log(response3.response);
  } catch (err) {
    console.log("Error:", err);
  }
}

testPersonalAssistant();
