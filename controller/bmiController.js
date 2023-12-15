// Importing the BMI model and the BMI validation function

const BMI = require("../model/bmiModel");
const { validateBMI } = require("../validators/validateBMI");




//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//

// Controller function to create BMI record
const createBMI = async (req, res) => {
    const { name, height, weight } = req.body;

    // Check if 'name' is provided
    if (!name) {
        return res.status(200).json({ message: 'Please provide your name.' });
    }

    // Validate the input using the provided validation function
    const validationError = validateBMI(weight, height);
    if (validationError) {
        return res.status(400).json({ error: 'Validation error', details: validationError });
    }

    // Parse input values to floats
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    // BMI Calculation
    const bmiValue = Math.floor(parsedWeight / (parsedHeight * parsedHeight));

    // Determine BMI category
    let category;
    if (bmiValue < 18.5) {
        category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue <= 25) {
        category = 'Fit';
    } else {
        category = 'Overweight';
    }

    // Save BMI record to MongoDB
    try {
        const bmiRecord = new BMI({
            name,
            height: parsedHeight,
            weight: parsedWeight,
            bmi: bmiValue,
            category,
        });

        await bmiRecord.save();

        // Respond with BMI calculation results
        res.json({ message: `BMI calculation saved for ${name}.`, bmiValue, category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//







// Controller function to get all BMI records
const getAllresults = async (req, res) => {
    // Retrieve all BMI records from MongoDB
    const results = await BMI.find();

    // Check if there are no results
    if (!results) {
        res.status(500).json("Internal Server Error");
    }

    // Respond with the retrieved BMI records
    res.status(200).json({ Results: results });
}






//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//










// Controller function to update a user's BMI record
const updateUser = async (req, res) => {
    try {
        const userID = req.params.id;

        // Check if user ID is provided
        if (!userID) {
            return res.status(404).json({ message: "User ID not provided" });
        }

        // Find the user in the database by ID
        const user = await BMI.findById(userID);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's BMI record
        const updatedUser = await BMI.findByIdAndUpdate(
            userID,
            req.body,
            { new: true } // This option returns the modified document, not the original
        );

        // Check if the update was successful
        if (!updatedUser) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Respond with the updated user's BMI record
        res.status(201).json({
            message: `User updated successfully`,
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};







//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//
//______________________________________________________________________________________________________________________//











// Controller function to delete a user's BMI record
const deleteUser = async (req, res) => {
    const userID = req.params.id;

    // Check if user ID is provided
    if (!userID) {
        return res.status(404).json({ message: "User ID not provided" });
    }

    // Find the user in the database by ID
    const user = await BMI.findById(userID);

    // Check if user exists
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Delete the user's BMI record
    const deletedUser = await BMI.findByIdAndDelete(userID);

    // Check if the deletion was successful
    if (!deletedUser) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // Respond with the deleted user's BMI record
    res.status(200).json({
        message: `User deleted successfully`,
        user: deletedUser
    });
};

// Exporting the controller functions to make them accessible from other parts of the application
module.exports = { createBMI, getAllresults, deleteUser, updateUser };
