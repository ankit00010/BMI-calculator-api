// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for BMI records
const bmiSchema = new mongoose.Schema({
    name: { type: String, required: true },      // Name of the individual (String, required)
    height: { type: Number, required: true },    // Height of the individual (Number, required)
    weight: { type: Number, required: true },    // Weight of the individual (Number, required)
    bmi: { type: Number, required: true },       // Calculated BMI value (Number, required)
    category: { type: String, required: true },  // BMI category (String, required)
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the record was created (Date, default: current date)
});

// Create a Mongoose model named 'BMI' using the defined schema
// The third argument specifies the collection name in the MongoDB database
const BMI = mongoose.model('BMI', bmiSchema, 'BMI');

// Export the BMI model to make it accessible from other parts of the application
module.exports = BMI;
