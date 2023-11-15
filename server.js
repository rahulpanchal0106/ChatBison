const {app} = require('./app');
const PORT = process.env.PORT;
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
async function dbConnect(){
    try{
        const con = await mongoose.connect(MONGODB_URI)
        console.log(`Connected to db cluster: ${con.connection.host}`)
    }catch(err){
        console.log(`Error: ${err}`);
    }
}
server.listen(PORT,async ()=>{
    await dbConnect();
    console.log(`Sever is live!`);
})
