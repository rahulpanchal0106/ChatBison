require('dotenv').config();

const express = require('express');
const app = express(); // Change `new express()` to `express()`
const morgan = require('morgan');
const path = require('path');
const request = require('request');

let prompt;
// const ipify = require('ipify');

// client_ip = ipify.v4();
// console.log(client_ip);


app.use(express.json());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.use(morgan('combined'));
var messages = [];

app.post('/send_prompt', async (req, res) => {
    const clientIP = req.ip;
    console.log('🌠',clientIP);
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
    // console.log('IP Address: ' + body.ip);
    // console.log('Country: ' + body.country);
    // console.log('Region: ' + body.region);
    // console.log('City: ' + body.city);
    // console.log('Zip Code: ' + body.postal);
    // console.log('Latitude: ' + body.loc.split(',')[0]);
    // console.log('Longitude: ' + body.loc.split(',')[1]);
    console.log(userInfo);
  });
    
    // const geoLocation = JSON.parse(res.body);
    // console.log('IP Address: ' + geoLocation.ip);
    // console.log('Country: ' + geoLocation.country);
    // console.log('Region: ' + geoLocation.region);
    // console.log('City: ' + geoLocation.city);
    // console.log('Zip Code: ' + geoLocation.zip);
    // console.log('Latitude: ' + geoLocation.latitude);
    // console.log('Longitude: ' + geoLocation.longitude);
    
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
        //console.log("👍",messages[messages.length-1]);
        
        res.status(200).json({ result: `${resp}` });
    } catch (error) {
        console.error('Error:', error);
        // PaLM_res = 'Sorry :( <br>I cannot give any information about that <br>Tell me to try again';
        // const regenerate = `
        //     <button id="regenerte">
        //         Regenerate
        //     </button>
        // `;
        res.status(200).json({ result:"" });
    }
    // console.log(messages);
    messages.push({"content":"NEXT REQUEST"})
});

app.get('https://api.ipify.org/',(req,res)=>{
    console.log(res,"💀💀💀\n",res.ip);
})
app.get('/allChats',(req,res)=>{
    res.json(messages);
})
module.exports = {
    app,
    prompt
};