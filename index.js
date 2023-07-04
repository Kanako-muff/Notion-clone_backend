const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 6600;
require("dotenv").config(); //⬅︎ .env file
const cors = require("cors"); //⬅︎ about CORS policy

// Giving access to localhost:3000 of "client"
// - An err would appear without it cause of the difference of the
// - port number between "server" and "client". 
app.use(cors({
    origin: "http://localhost:3000",
}))

// Telling "Recognize it as JSON objects!!!!"
app.use(express.json());

// Setting an endpoint
app.use("/api/v1", require("./src/v1/routes"));

//Connect to DB
// try {
//     mongoose.connect(process.env.MONGODB_URL);
//     console.log("Connecting to DB...");
// } catch (error) {
//     console.log(error);
// }

const mongoose = require('mongoose');
require('dotenv').config();

async function start() {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to DB');

    console.log('Starting local server...');
    // ローカルサーバーの起動などのコードを記述

    console.log('Server started');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

start();



//Only on the terminal
app.listen(PORT, ()=>{
    console.log("Starting local server...");
});