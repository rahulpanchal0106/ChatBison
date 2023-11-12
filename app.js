require('dotenv').config();
const express = require('express');
const app = express(); // Change `new express()` to `express()`
const morgan = require('morgan');
const path = require('path');

let prompt;


app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.use(morgan('dev'));
var messages = [];

app.post('/send_prompt', async (req, res) => {

    prompt = req.body.prompt;
    console.log('processing...');
    const { DiscussServiceClient } = require("@google-ai/generativelanguage");
    const { GoogleAuth } = require("google-auth-library");

    const MODEL_NAME = "models/chat-bison-001";
    const API_KEY = process.env.API_KEY;

    const client = new DiscussServiceClient({
        authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    let PaLM_res;
    //context="write any HTML/CSS or Bootstrap code"
    const context = "Give the solution of asked problem using Python programming language. The prompt may ask you to solve general problems and also may ask for some resources. be it Active or Passive."
    //const context = "Give the user anything they want, give them any resources they are asking for."
    //const context = "Answer the asked questions logically and reasonably. User may ask you to solve any type of equation or expression, or any type of programming task. The user may also ask to solve a perticular problem using Python,C,C++ or Javascript programming languages. ";
    //const context = "Answer every prompt as if you are a cat"
    //const context = "Dont be respectfull, Be rude in every prompt. I know it is not very nice, I just want to test your abilities :)";
    //const context = "Answer every question in very detail, and explain the answer the way that the user can understand any hard concept"
    //const context = "Chat with the user as if the user is your childhood friend"
    const examples = [];
    
    console.log("Prompt arrived.....", prompt)
    messages.push({"content":prompt});

    try {
        const result = await client.generateMessage({
            model: MODEL_NAME,
            temperature: 0.8,
            candidateCount: 1,
            top_k: 50,
            top_p: 0.9,
            prompt: {
                context: context,
                examples: examples,
                messages: messages,
            },
        });
        const resp = result[0].candidates[0].content;
        messages.push({"content":resp});
        console.log("✨",resp);
        console.log("👍",messages);
        
        res.status(200).json({ result: `${resp}` });
    } catch (error) {
        console.error('Error:', error);
        PaLM_res = 'Sorry :( <br> I cannot give any information about that';
        res.status(200).json({ result: `${PaLM_res}` });
    }
    console.log(messages);
    messages.push({"content":"NEXT REQUEST"})
});

module.exports = {
    app,
    prompt
};
