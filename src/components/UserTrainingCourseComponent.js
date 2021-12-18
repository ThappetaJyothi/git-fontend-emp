import { getCourseById, getAllCourses, deleteById, getCourseByName, postCourse, updateCourse } from "../redux/TrainingCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCourseByIdService, getAllCoursesService, deleteCourseByIdService, courseByNameService, postCourseService, updateCourseService } from "../service/TrainingCourseServices";
import TrainingCourseModel from "../model/TrainingCourseModel";
import { Link } from "react-router-dom";



const UserTrainingCourseComponent = () => {

    const [cid, setCid] = useState('');
    const [cName, setCname] = useState(" ");
    const [cid1, setCid1] = useState('');
    const [course, setCourse] = useState(new TrainingCourseModel());
    const [course1, setCourse1] = useState(new TrainingCourseModel())

    const dispatch = useDispatch();

    const trainingcourseDataFromStore = useSelector((state) => state.trainingcourse.trainingcourseState);
    const trainingDataFromStore = useSelector((state) => state.trainingcourse.trainingcourse1State);
    const trainingcourseListfromStore = useSelector((state) => state.trainingcourse.trainingcourseList);
    //--------------Handle method and submit method for id-------------------------------------------
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
    //---------------------------subit all courses-----------------------------------------------
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
    
  
    //============================course name------------------------------------------------

    const handleName = (e) => {
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
    
    

    //--------------------------------------jsx----------------------------------------------------
    return (
        <div  className="container">
            

            <div class="accordion" id="accordionExample">

                {/* -----------Find  all courses----------- */}
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <h4>Find all courses</h4>
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">


                            <div className="col-12 border border-light shadow p-3 mb-5 bg-white">
                                {/* <p>Find all courses</p> */}
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
                                                    <td>{tc.endingDate}</td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>


                {/* -----------Find   courses by id----------- */}

                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <h4>Find course by Id</h4>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                            <div className="col-12  border border-light shadow p-3 mb-5 bg-white" id="searchid">
                                <h3>Find course by id</h3>
                                <form className="form form-group form-primary" onSubmit={submitGetCourseById}>
                                    <input className="form-control mt-3" type="number" id="cid" name="cid" value={cid} onChange={handleTC} placeholder="Enter  Id" autoFocus required />
                                    <input className="form-control mt-3 btn btn-primary" type="submit" value="Find course" />
                                </form>

                                <table className="table table-light table-striped ">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Duration</th>
                                            <th>Status</th>
                                            <th>StartingDate</th>
                                            <th>EndingDate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{trainingcourseDataFromStore.courseId}</td>
                                            <td>{trainingcourseDataFromStore.courseName}</td>
                                            <td>{trainingcourseDataFromStore.courseDurationn}</td>
                                            <td>{trainingcourseDataFromStore.courseStatus}</td>
                                            <td>{trainingcourseDataFromStore.startingDate}</td>
                                            <td>{trainingcourseDataFromStore.endingDate}</td>

                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>

               

                {/* ---------- course by name------------------------------ */}

                <div class="card">
                    <div class="card-header" id="headingFour">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                <h4>Course by Name</h4>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseFour" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">

                            <div className="col-12  border border-light shadow p-3 mb-5 bg-white" id="searchcourse">
                                <h3>Course by Name</h3>
                                <form className="form form-group form-primary" onSubmit={submitCourseByName}>
                                    <input className="form-control mt-3" type="text" id="cName" name="cName" value={cName} onChange={handleName} placeholder="Enter text " />
                                    <input className="form-control mt-3 btn btn-primary" type="submit" value=" searchcourse" />
                                    <p><h3>Course with name: {trainingDataFromStore.courseName} details</h3></p>
                                    <table className="table table-light table-striped ">
                                        <thead>
                                            <tr>
                                                <th>Course id</th>
                                                {/* <th>Course name</th>  */}
                                                <th>Course duration</th>
                                                <th>Course status</th>
                                                <th>starting date</th>
                                                <th>ending date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{trainingDataFromStore.courseId}</td>
                                                {/* <td>{ trainingDataFromStore.courseName}</td> */}
                                                <td>{trainingDataFromStore.courseDurationn}</td>
                                                <td>{trainingDataFromStore.courseStatus}</td>
                                                <td>{trainingDataFromStore.startingDate}</td>
                                                <td>{trainingDataFromStore.endingDate}</td>


                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

               


               

            </div>

        </div>
    );
}


export default UserTrainingCourseComponent;