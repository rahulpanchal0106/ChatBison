require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const request = require('request');
const fs=require('fs');

const sendPrompt=require('./controllers/sendPrompt');

let prompt;
const logStream = fs.createWriteStream(path.join(__dirname, 'console.log'), { flags: 'a' });
console.log = function(message) {
  process.stdout.write(`${message}\n`);
  logStream.write(`${new Date().toISOString()} - ${message}\n`);
};
    
app.use(morgan('combined'));
app.use(express.json());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname,'public')));
// app.use((req,res,next)=>{
//     const 
// })

app.get('/', (req, res) => {
    const clientIP = '162.142.125.222';
    console.log(`🌠 ${clientIP} entered`);
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

    console.log(`Region: ${userInfo.Region}`);
    console.log(`City: ${userInfo.City}`);
    console.log(`(Lat,Long):(${userInfo.Latitude},${userInfo.Longitude})`)
  });
    res.sendFile(path.join(__dirname,'public','index.html'));
});

// var messages = [];

app.post('/send_prompt',sendPrompt);

// app.get('/allChats',(req,res)=>{
//     res.json(messages);
// })
module.exports = {
    app,
    prompt
};