const BMI = require("../model/bmiModel");
const { validateBMI } = require("../validators/validateBMI");

const createBMI = async (req, res) => {
    const { name, height, weight } = req.body;

    if (!name) {
        return res.status(200).json({ message: 'Please provide your name.' });

    }

    // Validating the input function
    const validationError = validateBMI(weight, height);
    if (validationError) {
        return res.status(400).json({ error: 'Validation error', details: validationError });
    }

    // Parse input
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

    // Save to MongoDB
    try {
        const bmiRecord = new BMI({
            name,
            height: parsedHeight,
            weight: parsedWeight,
            bmi: bmiValue,
            category,
        });

        await bmiRecord.save();

        res.json({ message: `BMI calculation saved for ${name}.`, bmiValue, category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllresults = async (req, res) => {

    const results = await BMI.find();
    if (!results) {
        res.status(500).json("Internal Server Error");

    }
    res.status(200).json({ Results: results });

}

const updateUser = async (req, res) => {
    try {
        const userID = req.params.id;

        if (!userID) {
            return res.status(404).json({ message: "User ID not provided" });
        }

        const user = await BMI.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await BMI.findByIdAndUpdate(
            userID, // Use userID here
            req.body,
            { new: true } // This option returns the modified document, not the original
        );

        if (!updatedUser) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(201).json({
            message: `User updated successfully`,
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { updateUser };

const deleteUser = async (req, res) => {
    const userID = req.params.id;

    if (!userID) {
        return res.status(404).json({ message: "User ID not provided" });
    }

    const user = await BMI.findById(userID);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await BMI.findByIdAndDelete(userID);

    if (!deletedUser) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(200).json({
        message: `User deleted successfully`,
        user: deletedUser
    });
};

module.exports = { createBMI, getAllresults, deleteUser, updateUser };
