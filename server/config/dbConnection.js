// Import the mongoose library
const mongoose = require("mongoose");

// Define an asynchronous function named connectionDB to handle the database connection
const connectionDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the provided URI from the environment variables
        const connect = await mongoose.connect(process.env.MONGO_URI);

        // If the connection is successful, log a message indicating the successful connection
        console.log("Database is connected : ", connect.connection.name);
    }
    catch (err) {
        // If an error occurs during the connection attempt, log the error and exit the process with an error code
        console.log(err);
        process.exit(1);
    }
}

// Export the connectionDB function to make it accessible from other parts of the application
module.exports = connectionDB;
