const express = require("express");
const router = express.Router();
const services   = require("../services/courseServices");

router.get("/", async (req, res) => {
    try{
    //     const username = req.user.username;
    //   const courses = await services.getCoursesByUsername(username);
      res.status(200).send("courses");
    }catch(e){
     res.status(500).send({ error: e.message || " Server Error" });
  }
});
module.exports = router;
