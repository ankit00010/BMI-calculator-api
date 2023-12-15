// Validation function for BMI input
const validateBMI = (weight, height) => {
    // Check if weight or height is not a positive number
    if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
        return { error: "Weight or Height should be a positive number." };
    } else {
        // Parse weight and height to floats
        const parsedWeight = parseFloat(weight);
        const parsedHeight = parseFloat(height);

        // Define minimum and maximum height values
        const MIN_HEIGHT = 0.5;
        const MAX_HEIGHT = 3;

        // Check if height is outside the valid range
        if (parsedHeight < MIN_HEIGHT || parsedHeight > MAX_HEIGHT) {
            return { error: `Height must be between ${MIN_HEIGHT} and ${MAX_HEIGHT} meters.` };
        }

        // Check if weight or height has more than two decimal places
        const decimalWeight = (parsedWeight.toString().split('.')[1] || []).length;
        const decimalHeight = (parsedHeight.toString().split('.')[1] || []).length;

        if (decimalHeight > 2 || decimalWeight > 2) {
            return { error: 'Values should have at most two decimal places. eg: height=1.55 and weight=56.25' };
        }
    }

    // If no validation error is found, return null
    return null;
};

// Export the validation function to make it accessible from other parts of the application
module.exports = { validateBMI };
