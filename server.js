const app = require('./app');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
    try {
        const con = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true
        });
        console.log(`Connected to db cluster: ${con.connection.host}`);
        return con; // Returning the connection
    } catch (err) {
        console.log(`Error: ${err}`);
        throw err; // Throw error if connection fails
    }
}

// Start server function
async function startServer() {
    try {
        await dbConnect(); // Await database connection
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is live!`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit process if server fails to start
    }
}

startServer(); // Call the function to start the server
