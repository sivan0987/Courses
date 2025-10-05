import styles from "./style.module.css";

const CourseList = ({ name, courses, setSelectedCourse }) => {
  return (
    <>
      <h4 className={styles.name}>Welcome {name}</h4>
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
