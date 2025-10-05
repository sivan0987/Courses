
const express = 
  require("express"),
  app = express(),
  PORT = 3000,
  cors = require("cors"),
  path = require("path"),
  connectDB =require("./config/db");

    
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    const courseRouter = require("./routes/courseRouter");
    app.use("/courses", courseRouter);

    connectDB();
    app.listen(PORT, () => console.log("##### Server is UP on port" , PORT));
 