import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setBody: (state, action) => {
            return action.payload;
        },
        setToken: (state, action) => {
            return action.payload;
        }
    }
})

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;