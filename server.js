const express = require("express");
const connectionDB = require("./config/dbConnection");
const bmiRoutes = require("./routes/bmiRoutes");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
connectionDB();    //Database connection




app.use(express.json());




const port = 3000;  //default port


app.use("/api/user/bmi", bmiRoutes);
//Listening port


app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})