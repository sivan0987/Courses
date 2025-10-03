const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  courses: [
    {
      title: { type: String, required: true }, 
      lessons: [
        {
          title: { type: String, required: true },   
          videoUrl: { type: String },               
          description: { type: String }            
        }
      ]
    }
  ]
});

module.exports = mongoose.model("courses", coursesSchema);
