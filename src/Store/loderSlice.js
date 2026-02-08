import { createSlice } from "@reduxjs/toolkit";


const loderSlice = createSlice({
    name: "loder",
    initialState : {showLoader : false},
    reducers: {
      setLoader : (state, action) => {
        state.showLoader = action.payload;
      },
    },

});

export const {setLoader} = loderSlice.actions;
export default loderSlice.reducer;