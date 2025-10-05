import axios from "axios";
import { useState } from "react";
import styles from "./style.module.css";

const LessonsList = ({selectedCourse ,setSelectedCourse}) =>{
  const [quiz,setQuiz] =useState([]);
  const [answers,setAnswers] =useState({});
  const [grade,setGrade] =useState();
  const [lesson,setLesson] =useState({});

  const handleChange =(question,ans)=>{
      setAnswers(prev => ({...prev,[question] :ans}))
    }
  const handeleCheck = ()=>{
    if (Object.keys(answers).length !== 5) {
      alert("Please answer all questions before checking!");
      return;
    }
      let sum =0;
      { quiz.map((question,index)=>(
           question.correct ===answers[index]? sum+=10:sum+=0 
       ))
     }
     setGrade(sum);
    
    
      
  }
  const handeleBackToLessons =()=>{
    setQuiz([]);
    setAnswers({});
    setGrade()
  }
    const handeleTest = (lesson)=>{
        setLesson(lesson);
        axios.post ("http://localhost:3000/courses/generateTest",
          {lessonName:lesson.title , pdfPath:lesson.pdfUrl }
        ).then(res =>setQuiz( res.data)
       )
        .catch(err => console.error(err));
    }

    if (quiz.length >0){
      return (
      < div className={styles.quizContainer}>
  {quiz.map((question, index) => (
    <div key={index} className={styles.questionBlock}>
      <h4>{question.question}</h4>
      <ul className={styles.optionsList}>
        {question.options.map((option, i) => (
          <li key={i}>
            <input
              type="radio"
              name={`question-${index}`} 
              value={option}
              checked={answers[index] === option} 
              onChange={() => handleChange(index, option)} 
            />
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}

  <button className={styles.checkButton} onClick={handeleCheck}>Check me</button>
  {grade !== undefined && (<button className={styles.checkButton} onClick={()=>handeleTest(lesson)}>New test</button>)}
{grade !== undefined && (
    <div className={styles.gradeContainer}>
      <p>Your grade is: {grade}</p>
      <div className={styles.backButtons}>
      <button className={styles.checkButton} onClick={() => setSelectedCourse(null)}>Back to course</button>
      <button  className={styles.checkButton} onClick={ handeleBackToLessons}>Back to lessons</button>
    </div>
    </div>
  )}
</div>
      
      );
    }
    else {
    return <>
    <button className={styles.backButton} onClick={() => setSelectedCourse(null)}>
      back
    </button>
    <h4 className={styles.courseTitle}>{selectedCourse.title}</h4>
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Video</th>
            <th>PDF</th>
            <th>Description</th>
            <th>Test</th>
          </tr>
        </thead>
        <tbody>
          {selectedCourse.lessons.map((lesson, index) => (
            <tr key={index}>
              <td>{lesson.title}</td>
              <td>{lesson.videoUrl}</td>
              <td>
                <a
                  href={`http://localhost:3000/${lesson.pdfUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF
                </a>
              </td>
              <td>{lesson.description}</td>
              <td>
                <button
                  className={styles.testButton}
                  onClick={() => handeleTest(lesson)}
                >
                  Test me
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
}}
export default LessonsList 