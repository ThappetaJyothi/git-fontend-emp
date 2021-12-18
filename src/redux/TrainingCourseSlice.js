import { createSlice } from "@reduxjs/toolkit";
import TrainingCourseModel from '../model/TrainingCourseModel'

const TrainingCourseSlice = createSlice({
    name:'trainingcourse',

    initialState: {

        trainingcourseState: new TrainingCourseModel(),
        trainingcourse1State: new TrainingCourseModel(),
        trainingcourseList:[]
    },

    reducers: {
        getCourseById: (state, action) => {
            console.log("course Slice reducers getCourseById");
            state.trainingcourseState = action.payload;
        },
        getAllCourses:(state,action)=>{
            console.log("all courses");
            state.trainingcourseList=action.payload;
        },
        deleteById:(state,action)=>{
            console.log("delete method by Id");
             state.trainingcourseState=action.payload;
        },
        getCourseByName:(state,action)=>{
            console.log("view by course slice");
            state.trainingcourse1State=action.payload;
        },
        postCourse:(state,action)=>{
           console.log("posting the training course");
           state.trainingcourseState=action.payload;
        },
        updateCourse:(state,action)=>{
            console.log("update course in slice");
            state.trainingcourseState=action.payload;
        }
    }
}

);

export const {getCourseById,getAllCourses,deleteById,getCourseByName,postCourse,updateCourse} = TrainingCourseSlice.actions;
export default TrainingCourseSlice.reducer;