import { createSlice } from "@reduxjs/toolkit";

const actorsSlice = createSlice({
    name: "actiors",
    initialState: [],
    reducers: {
        setActors: (state, actions) => {
            return actions.payload;
        }
    }
});

export const { setActors } = actorsSlice.actions;
export default actorsSlice.reducer;