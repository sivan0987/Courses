const mongoose = require("mongoose");
require("dotenv").config(); 
const MONGO_URL = process.env.MONGO_URL;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL).then(() => {
            console.log("##### Connected to MongoDB #####");
        })
    } catch (error) {
        console.log("##### Error connecting to MongoDB #####", error);
    }
}

module.exports = connectDB;