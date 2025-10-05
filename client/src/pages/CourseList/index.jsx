import styles from "./style.module.css";

const CourseList = ({ name, courses, setSelectedCourse }) => {
  return (
    <>
      <h3 className={styles.name}>Welcome {name}</h3>
      <h4 className={styles.name}>My courses</h4>
      <ul className={styles.courseList}>
        {courses.map((course) => (
          <li
            key={course._id}
            className={styles.courseItem}
            onClick={() => setSelectedCourse(course)}
          >
            <span  className={styles.courseName}>{course.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CourseList;
