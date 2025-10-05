const controller = require ("../controller/courseController");

const getCoursesByUsername = async (username) => {
  const courses = await controller.readCourses(username);
  if (courses.length === 0) return []; 
  return courses[0].courses;                  
};

module.exports = { getCoursesByUsername };
