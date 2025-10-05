const express = require("express");
const router = express.Router();
const services   = require("../services/courseServices");
const aiservices   = require("../services/aiServices");
router.post("/generateTest", async (req, res) => {
  try {
    const { lessonName, pdfPath } = req.body;
    console.log( lessonName, pdfPath );
    
    const quiz = await aiservices.generateQuizFromPDF(lessonName, pdfPath);
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:username", async (req, res) => {
    try{
        const username = req.params.username;
      const courses = await services.getCoursesByUsername(username);
      res.status(200).send(courses);
    }catch(e){
     res.status(500).send({ error: e.message || " Server Error" });
  }
});

module.exports = router;
