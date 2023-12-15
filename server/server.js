// Import necessary libraries
const express = require("express");
const connectionDB = require("./config/dbConnection");
const bmiRoutes = require("./routes/bmiRoutes");
const dotenv = require("dotenv");

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();

// Establish a connection to the MongoDB database
connectionDB();

// Middleware to parse JSON requests
app.use(express.json());

// Default port for the server
const port = 3000;

// Use BMI routes for requests starting with "/api/user/bmi"
app.use("/api/user/bmi", bmiRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
