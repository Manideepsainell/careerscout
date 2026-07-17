import ai from "./gemini.js";


const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents: "Say Hello from Gemini",
});

console.log(response.text);

