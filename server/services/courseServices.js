const controller = require ("../controller/courseController");

const getCoursesByUsername = async (username) => {
  const courses = await controller.readCourses(username);
  return courses;                   
};

module.exports = { getCoursesByUsername };
