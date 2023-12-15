const validateBMI = (weight, height) => {
    if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
        return { error: "Weight or Height should be a positive number." };
    } else {
        const parsedWeight = parseFloat(weight);
        const parsedHeight = parseFloat(height);
        console.log(parsedHeight);
        const MIN_HEIGHT = 0.5;
        const MAX_HEIGHT = 3;

        if (parsedHeight < MIN_HEIGHT || parsedHeight > MAX_HEIGHT) {
            return { error: `Height must be between ${MIN_HEIGHT} and ${MAX_HEIGHT} meters.` };
        }

        const decimalWeight = (parsedWeight.toString().split('.')[1] || []).length;
        const decimalHeight = (parsedHeight.toString().split('.')[1] || []).length;

        if (decimalHeight > 2 || decimalWeight > 2) {
            return { error: 'Values should have at most two decimal places. eg: height=1.55 and weight=56.25' };
        }
    }

    return null;
};

module.exports = { validateBMI };
