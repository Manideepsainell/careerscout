import ai from "./gemini.js";

console.log("Available models:\n");

const models = await ai.models.list();

for await (const model of models) {
  console.log(model.name);
}