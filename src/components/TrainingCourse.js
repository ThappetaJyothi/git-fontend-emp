import { getCourseById,getAllCourses,deleteById ,getCourseByName, postCourse,updateCourse} from "../redux/TrainingCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCourseByIdService,getAllCoursesService ,deleteCourseByIdService,courseByNameService,postCourseService,updateCourseService} from "../service/TrainingCourseServices";
import TrainingCourseModel from "../model/TrainingCourseModel";


const TrainingCourse = () => {

    const [cid, setCid] = useState('');
    const [cName, setCname] = useState(" ");
    const [course,setCourse]=useState(new TrainingCourseModel())

    const dispatch = useDispatch();

    const trainingcourseDataFromStore = useSelector((state) => state.trainingcourse.trainingcourseState);
    const trainingcourseListfromStore = useSelector((state) => state.trainingcourse.trainingcourseList);

    const handleTC = (e) => {
        console.log('handle Course');
        setCid(e.target.value);
    }

    const submitGetCourseById = (evt) => {
        evt.preventDefault();
        console.log('submitGetCourseById');
        getCourseByIdService(cid)
            .then((response) => {
                dispatch(getCourseById(response.data));             // Sending data to redux store

            })
            .catch(() => {
                alert(`Course with ${cid} not found.`);
            });

        setCid('');
    }
    const submitGetAllCourses = (evt) => {
        evt.preventDefault();
        console.log('submitGetAllCourses');
        getAllCoursesService()
            .then((response) => {
                dispatch(getAllCourses(response.data));
            })
            .catch(() => {
                alert(`Something is wrong!`);
            });
    }
    const handleDelete=(e)=>{
        console.log("delete method in courses");
        setCid(e.target.value);
    }
    const submitDeleteCourseById = (evt) => {
        evt.preventDefault();
        console.log('submitDeleteCourseById');
        deleteCourseByIdService(cid)
            .then((response) => {
                dispatch(deleteById(response.data));  
                alert(`course with ${cid} is deleted sucessfully`);           

            })
            .catch(() => {
                alert(`Course with ${cid} not found.`);
            });

        setCid('');
    }
    const handleName=(e)=>{
        console.log("name in course");
        setCname(e.target.value);
    }
    const submitCourseByName = (evt) => {
        evt.preventDefault();
        console.log('submitCourseByName');
        courseByNameService(cName)
            .then((response) => {
                dispatch(getCourseByName(response.data));  
                           

            })
            .catch(() => {
                alert(`Course with ${cName} not found.`);
            });

        setCname('');
    }
    const handleCourse=(e)=>{
        console.log("adding courses");
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }
   
    const submitPostCourse=(evt)=>{
        evt.preventDefault();
        console.log("posting course by submit");
        postCourseService(course)
           .then((response)=>{
               dispatch(postCourse(response.data));
               alert(`course is added sucessfully`);
           })
           .catch(()=>{
               alert(`something went wrong!`);
           });
           setCourse('');
    }
    const handleUpdate=(e)=>{
        console.log("update course");

        setCourse({
            ...course,
            [e.target.name]:e.target.value
        });
       // console.log(e.target.value);
    }
    const submitUpdate=(evt)=>{
        evt.preventDefault();
        console.log("update the course");
        updateCourseService(course)
        .then((response)=>{
            dispatch(updateCourse(response.data));
            alert(`course updated sucesfully`);
        })
        .catch(()=>{
            alert(`course is not found`);
        });
        setCourse('');
    }



    return (
        <div className="container">
            <h1 className="display-4 text-primary mt-3 mb-3" >TrainingCourse Component</h1>

            <div className="col-12  border border-light shadow p-3 mb-5 bg-white">
                <h3>Find course by id</h3>
                <form className="form form-group form-primary" onSubmit={submitGetCourseById}>
                    <input className="form-control mt-3" type="number" id="cid" name="cid" value={cid} onChange={handleTC} placeholder="Enter  Id" autoFocus required />
                    <input className="form-control mt-3 btn btn-primary" type="submit" value="Find course" />
                </form>

                <table className="table table-light table-striped ">
                        <thead>
                            <tr>
                                <th>Course id</th>
                                <th>Course name</th>
                                <th>Course duration</th>
                                <th>Course status</th>
                                <th>starting date</th>
                                <th>ending date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                               <td>{ trainingcourseDataFromStore.courseId}</td>
                               <td>{ trainingcourseDataFromStore.courseName}</td>
                               <td>{ trainingcourseDataFromStore.courseDurationn}</td>
                               <td>{ trainingcourseDataFromStore.courseStatus}</td>
                               <td>{ trainingcourseDataFromStore.startingDate}</td>
                               <td>{ trainingcourseDataFromStore.endingDate}</td>

                            </tr>
                        </tbody>
                    </table>
                                    
            </div>
            <div>
                <div className="col-12 border border-light shadow p-3 mb-5 bg-white">
                    <p>Find all courses</p>
                    <div>
                        <form className="form form-group form-primary">
                            <input className="mt-3 btn btn-primary btn-block" type="button" onClick={submitGetAllCourses} value="Find All Courses" />
                        </form>
                    </div >
                    <table className="table table-light table-striped ">
                        <thead>
                            <tr>
                            <th>Course id</th>
                                <th>Course name</th>
                                <th>Course duration</th>
                                <th>Course status</th>
                                <th>starting date</th>
                                <th>ending date</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {trainingcourseListfromStore.map((tc, k) => {
                                return (
                                    <tr k={k}> <td>{tc.courseId}</td>
                                                <td>{tc.courseName}</td>
                                                <td>{tc.courseDurationn}</td>
                                                <td>{tc.courseStatus}</td>
                                                <td>{tc.startingDate}</td>
                                                <td>{tc.endingDate}<td> </td></td>
                                                 </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-12  border border-light shadow p-3 mb-5 bg-white">
                <h3>Delete course by id</h3>
                <form className="form form-group form-primary" onSubmit={submitDeleteCourseById}>
                    <input className="form-control mt-3" type="number" id="cid" name="cid" value={cid} onChange={handleDelete} placeholder="Enter  Id" autoFocus required />
                    <input className="form-control mt-3 btn btn-primary" type="submit" value="Delete course" />
                </form>
            </div>
            <div className="col-12  border border-light shadow p-3 mb-5 bg-white">
                <h3>Course by Name</h3>
                <form className="form form-group form-primary" onSubmit={submitCourseByName}>
                    <input className="form-control mt-3" type="text" id="cName" name="cName" value={cName} onChange={handleName} placeholder="Enter text " autoFocus required />
                    <input className="form-control mt-3 btn btn-primary" type="submit" value=" searchcourse" />
                    <table className="table table-light table-striped ">
                        <thead>
                            <tr>
                                <th>Course id</th>
                                <th>Course name</th>
                                <th>Course duration</th>
                                <th>Course status</th>
                                <th>starting date</th>
                                <th>ending date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                               <td>{ trainingcourseDataFromStore.courseId}</td>
                               <td>{ trainingcourseDataFromStore.courseName}</td>
                               <td>{ trainingcourseDataFromStore.courseDurationn}</td>
                               <td>{ trainingcourseDataFromStore.courseStatus}</td>
                               <td>{ trainingcourseDataFromStore.startingDate}</td>
                               <td>{ trainingcourseDataFromStore.endingDate}</td>
                               

                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="col-12 border border-light shadow p-3 mb-5 bg-white">
                <h3>Add New Course</h3>
                <form className="form form-group form-primary" onSubmit={submitPostCourse}>
                <input className="form-control mt-3" type="text" id="courseName" name="courseName" value={course.courseName} onChange={handleCourse} placeholder="Enter course name" autoFocus required />
                <input className="form-control mt-3" type="text" id="courseDurationn" name="courseDurationn" value={course.courseDurationn} onChange={handleCourse} placeholder="Enter course duration" autoFocus required />
                <input className="form-control mt-3" type="text" id="courseStatus" name="courseStatus" value={course.courseStatus} onChange={handleCourse} placeholder="Enter course status" autoFocus required />
                <input className="form-control mt-3" type="text" id="startingDate" name="startingDate" value={course.startingDate} onChange={handleCourse} placeholder="Enter course  starting date" autoFocus required />
                <input className="form-control mt-3" type="text" id="endingDate" name="endingDate" value={course.endingDate} onChange={handleCourse} placeholder="Enter course ending date" autoFocus required />
                    <input className="form-control mt-3 btn btn-primary" type="submit" value="add course" />
                </form>
            </div>
            <div className="col-12 border border-light shadow p-3 mb-5 bg-white">
                <h3>Update Course</h3>
                <form className="form form-group form-primary" onSubmit={submitUpdate}>
                <input className="form-control mt-3" type="text" id="courseId" name="courseId" value={course.courseId} onChange={handleUpdate} placeholder="Enter course id to update" autoFocus required />
                <input className="form-control mt-3" type="text" id="courseName" name="courseName" value={course.courseName} onChange={handleUpdate} placeholder="Enter course name" autoFocus required />
                <input className="form-control mt-3" type="text" id="courseDurationn" name="courseDurationn" value={course.courseDurationn} onChange={handleUpdate} placeholder="Enter course duration" autoFocus required />
                <input className="form-control mt-3" type="text" id="courseStatus" name="courseStatus" value={course.courseStatus} onChange={handleUpdate} placeholder="Enter course status" autoFocus required />
                <input className="form-control mt-3" type="text" id="startingDate" name="startingDate" value={course.startingDate} onChange={handleUpdate} placeholder="Enter course  starting date" autoFocus required />
                <input className="form-control mt-3" type="text" id="endingDate" name="endingDate" value={course.endingDate} onChange={handleUpdate} placeholder="Enter course ending date" autoFocus required />
                 <input className="form-control mt-3 btn btn-primary" type="submit" value="update course" />
                </form>
            </div>
        </div>
    );
}


export default TrainingCourse;