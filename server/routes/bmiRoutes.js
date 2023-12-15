// Import the Express library
const express = require("express");

// Create an Express Router
const router = express.Router();

// Import BMI controller functions
const { createBMI, getAllresults, deleteUser, updateUser } = require("../controller/bmiController");

// Define routes for handling BMI-related operations

// Route for handling GET and POST requests to the root path ("/")
router.route("/")
    .get(getAllresults) // GET request to retrieve all BMI results
    .post(createBMI);   // POST request to create a new BMI record

// Route for handling PUT and DELETE requests to paths with a user ID ("/:id")
router.route("/:id")
    .put(updateUser)    // PUT request to update a user's BMI record
    .delete(deleteUser); // DELETE request to delete a user's BMI record

// Export the router to make it accessible from other parts of the application
module.exports = router;
