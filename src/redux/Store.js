import schemeReducer from './SchemeSlice';
import trainingcourseReducer from "./TrainingCourseSlice";

import { configureStore } from "@reduxjs/toolkit";

console.log('store');
const store = configureStore(
    {
        reducer: {
           // scheme: schemeReducer,
            trainingcourse:trainingcourseReducer,
            
        }
    }
);

export default store;