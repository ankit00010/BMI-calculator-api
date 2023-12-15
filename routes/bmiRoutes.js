const express = require("express");
const router = express.Router();
const { createBMI, getAllresults, deleteUser, updateUser } = require("../controller/bmiController");




router.route("/").get(getAllresults).post(createBMI);

router.route("/:id").put(updateUser).delete(deleteUser)
module.exports = router;