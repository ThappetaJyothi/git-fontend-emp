import axios from 'axios';

const getCourseByIdService = (cid) => {
    console.log(`getCourse ById Service`);
    return axios.get(`/trainingcourse/${cid}`);
}

const getAllCoursesService = () => {
    console.log(`get Courses ByService`);
    return axios.get(`/viewallcourses`);
}
const deleteCourseByIdService=(cid1)=>{
    console.log("delete in service");
    return axios.delete(`/deletecourse/${cid1}`);
}
const courseByNameService=(cName)=>{
    console.log("name in service");
    return axios.get(`/viewbycoursename/${cName}`)
}
const postCourseService=(trainingcourse)=>{
    console.log("post course in service");
    return axios.post(`/trainingcourses`,trainingcourse);
}
const updateCourseService=(trainingcourse)=>{
    console.log("update in services");
    return axios.put(`/update`,trainingcourse);
}



export { getCourseByIdService,getAllCoursesService,deleteCourseByIdService,courseByNameService,postCourseService,updateCourseService};