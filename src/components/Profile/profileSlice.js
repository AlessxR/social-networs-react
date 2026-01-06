import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const apiLink = `https://social-network.samuraijs.com/api/1.0/profile`;

const initialState = {
    posts: [],
}

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (_, {rejectWithValue}) => {
    try {
        const response = await fetch(apiLink);

        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        return await response.json();
    } catch(e) {
        console.error(e);
    }
});

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        onAddPost: (state, action) => {
            state.posts.push(action.payload)
        },

    },
    extraReducers: () => {

    }
});



export default profileSlice.reducer;

export const {onAddPost} = profileSlice.actions;