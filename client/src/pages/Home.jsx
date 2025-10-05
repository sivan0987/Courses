import axios from "axios";
import { useEffect, useState } from "react"
import CourseList from "./CourseList";
import LessonsList from "./LessonsList";

const Home = ()=>{
    const [courses,setCourses] = useState([]);
    const [selectedCourse , setSelectedCourse] = useState(null);
    const [name ,setName] =useState("sivan");

    useEffect(()=>{
        axios.get(`http://localhost:3000/courses/${name}`)
        .then(res => setCourses(res.data))
        .catch(err => console.error(err));
    },[])
    return<>
{selectedCourse ?<LessonsList selectedCourse={selectedCourse} setSelectedCourse ={setSelectedCourse}/> : <CourseList  name={name} courses={courses} setSelectedCourse={setSelectedCourse}/> }
    </>
    
}

export default Home