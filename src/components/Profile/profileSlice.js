import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        onAddPost: (state, action) => {
            state.posts.push(action.payload)
        }
    }
});

export default profileSlice.reducer;

export const {onAddPost} = profileSlice.actions;