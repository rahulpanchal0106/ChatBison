const { app } = require('./app');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
    try {
        const con = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true
        });
        console.log(`Connected to db cluster: ${con.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}

dbConnect(); // No need to await here

module.exports = app; // Export the app for Vercel
