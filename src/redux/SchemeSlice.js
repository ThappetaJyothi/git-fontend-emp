import { createSlice } from "@reduxjs/toolkit";
import SchemeModel from '../model/SchemeModel'

const SchemeSlice = createSlice({
    name:'scheme',

    initialState: {

        schemeState: new SchemeModel(),
    },

    reducers: {
        getSchemeById: (state, action) => {
            console.log("SchemeSlice reducers getSchemeById");
            state.schemeState = action.payload;
        }
    }
}

);

export const {getSchemeById} = SchemeSlice.actions;
export default SchemeSlice.reducer;