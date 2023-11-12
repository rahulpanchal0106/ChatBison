// require('dotenv').config();

// const { DiscussServiceClient } = require("@google-ai/generativelanguage");
// const { GoogleAuth } = require("google-auth-library");

// const MODEL_NAME = "models/chat-bison-001";
// const API_KEY = process.env.API_KEY;

// const client = new DiscussServiceClient({
//   authClient: new GoogleAuth().fromAPIKey(API_KEY),
// });

// const {prompt} = require('./app')
// //const prompt="Write a meowwwww";
// console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${prompt}`)

// let PaLM_res;
// const context = "";
// const examples = [];
// const messages = [
//   {
//     "content": prompt,
//   }
// ];

// messages.push({ "content": "NEXT REQUEST" });

// client.generateMessage({
//   model: MODEL_NAME,
//   temperature: 0.9,
//   candidateCount: 1,
//   top_k: 40,
//   top_p: 0.95,
//   prompt: {
//     context: context,
//     examples: examples,
//     messages: messages,
//   },
// }).then(result => {
// //   console.log(JSON.stringify(result, null, 2));
//     console.log(`Prompt: ${prompt}`);
//     console.log(JSON.stringify(result[0].candidates[0].content, null, 2));
//     PaLM_res = JSON.stringify(result[0].candidates[0].content, null, 2);
// });

// module.exports=PaLM_res;