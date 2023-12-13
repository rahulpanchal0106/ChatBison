require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const fs=require('fs');

const sendPrompt=require('./controllers/sendPrompt');
const getChatBison=require('./controllers/getChatBison');
const authenticate = require('./controllers/auth');
const getAdminLogin = require('./controllers/getAdminLogin')
const getAdminDash = require('./controllers/getAdminDash')
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

app.get('/', getChatBison);

// var messages = []

app.post('/send_prompt',sendPrompt);

app.get('/admin',getAdminLogin)
app.get('/getAdmin',authenticate,getAdminDash);
// app.get('/allChats',(req,res)=>{
//     res.json(messages);
// })
module.exports = {
    app,
    prompt
};
