require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const request = require('request');
const fs=require('fs');

let prompt;
const logStream = fs.createWriteStream(path.join(__dirname, 'console.log'), { flags: 'a' });
console.log = function(message) {
  process.stdout.write(`${message}\n`);
  logStream.write(`${new Date().toISOString()} - ${message}\n`);
};
    

app.use(express.json());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname,'public')));
// app.use((req,res,next)=>{
//     const 
// })

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.use(morgan('combined'));
var messages = [];

app.post('/send_prompt', async (req, res) => {
    const clientIP = req.ip;
    console.log(`🌠,${clientIP}`);
    const IPINFO_TOKEN = process.env.IPINFO_TOKEN;
    const ipinfo = `https://ipinfo.io/${clientIP}?token=${IPINFO_TOKEN}`;

  request(ipinfo, { json: true }, (error, res, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const userInfo={
        'IP Address':body.ip,
        'Country':body.country,
        'Region':body.region,
        'City':body.city,
        'Zip Code':body.postal,
        'Latitude':body.loc.split(',')[0],
        'Longitude':body.loc.split(',')[1]
    }

    console.log(userInfo.Region);
    //JSON.stringify(userInfo)
    //log(userInfo['IP Address'])
    // log(`\nIP Address: ${body.ip}`);
    // log(`Country: ${body.country}`);
    // log(`Region: ${body.region}`);
    // log(`City: ${body.city}`);
    // log(`Zip Code: ${body.postal}`);
    // log(`(Lati,Longi):(${body.loc.split(',')[0]},${body.loc.split(',')[1]})`)
    // log(userInfo.Longitude);
    console.log(userInfo.City);
  });



    prompt = req.body.prompt;

    console.log('processing...');
    // log('Processing...');
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
    
    console.log(`Prompt arrived..... ${prompt}`)
    // log(`Prompt arrived..... ${prompt}`);
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

        console.log(`✨ ${resp}`);
        
        // log(`✨ ${resp}`);
        //console.log("👍",messages[messages.length-1]);
        
        res.status(200).json({ result: `${resp}` });
    } catch (error) {
        console.error('Error:', error);
        res.status(200).json({ result:"" });
    }
    // console.log(messages);
    messages.push({"content":"NEXT REQUEST"})
});

app.get('/allChats',(req,res)=>{
    res.json(messages);
})
module.exports = {
    app,
    prompt
};