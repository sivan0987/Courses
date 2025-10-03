
const express = 
  require("express"),
  app = express(),
  PORT = 3000,
  cors = require("cors"),
  // dotenv = require("dotenv"),
  connectDB =require("./config/db");

    // dotenv.config();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    const courseRouter = require("./routes/courseRouter");
    app.use("/courses", courseRouter);
    connectDB();
    app.listen(PORT, () => console.log("##### Server is UP on port" , PORT));
 