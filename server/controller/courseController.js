const model = require("../models/model");

const readCourses = async (username) => {   
  const courses = await model.find({username: username});
  return courses;
};

module.exports = { readCourses };
