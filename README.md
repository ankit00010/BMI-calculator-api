# BMI Calculator API

## Overview

This is a simple Node.js backend API for a BMI (Body Mass Index) calculator. The API accepts user input for name , height and weight, performs the BMI calculation, and categorizes the result as underweight, fit, or overweight. Additionally, it provides functionality for user management such as creating, updating, deleting, and retrieving BMI records.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Author](#author)


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ankit00010/BMI-calculator-api.git


# 2. Install dependencies
npm install

# 3. Set up a MongoDB database and update the connection string in config/dbConnection.js


# 4. Start the server
$ npm run dev



## Usage
The API is accessible at http://localhost:3000 by default.
Use API testing tools like Postman or CURL to interact with the endpoints.



## Endpoints
1. **Calculate BMI**
   - **HTTP Method:** POST
   - **Endpoint:** `http://localhost:3000/api/bmi/`
   - **Request Body:**
     ```bash
     {
       "name": "John Doe",
       "height": 1.75,
       "weight": 70
     }
     ```

   - **Response:**
     ```json
     {
       "message": "BMI calculation saved for John Doe.",
       "bmiValue": 22,
       "category": "Fit"
     }
     ```


2. **Get All BMI Records**
   - **HTTP Method:** GET
   - **Endpoint:** `http://localhost:3000/api/bmi/`

   - **Response:**
     ```json
     {
       "Results": [
         {
           "_id": "657bfaf39b820aa2bc259b2f",
           "name": "John Doe",
           "height": 1.75,
           "weight": 70,
           "bmi": 22,
           "category": "Fit",
           "timestamp": "2023-12-15T07:06:27.069Z",
           "__v": 0
         },
       ]
     }
     ```


3. **Update BMI Record**
   - **HTTP Method:** PUT
   - **Endpoint:** `http://localhost:3000/api/bmi/`
   - **Request Body:**
     ```bash
     {
       "weight": 75
     }
     ```

   - **Response:**
     ```json
     {
       "message": "User updated successfully",
       "user": {
         "_id": "60f0a858...",
         "name": "John Doe",
         "height": 1.75,
         "weight": 75,
         "bmi": 24.49,
         "category": "FIT"
       }
     }
     ```


4. **Delete BMI Record**
   - **HTTP Method:** DELETE
   - **Endpoint:** `http://localhost:3000/api/bmi/`

   - **Response:**
     ```json
     {
       "message": "User deleted successfully",
       "user": {
         "_id": "60f0a858...",
         "name": "John Doe",
         "height": 1.75,
         "weight": 70,
         "bmi": 22.86,
         "category": "FIT"
       }
     }
     ```




## Author
Ankit Mishra
ankitmishra.work005@gmail.com



        




