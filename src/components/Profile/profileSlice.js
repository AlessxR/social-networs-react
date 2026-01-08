import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {
    posts: [],
    status: null,
    profileId: 2,
    loading: false,
    error: null,
    profile: null,
}


export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (userId, {rejectWithValue}) => {

    try {

        const response = await fetch(`/api/1.0/profile/${userId}`);

        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        const data = await response.json();

        console.log(data);

        return await data;
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
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, state => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            state.status = action.payload?.lookingForAJobDescription || undefined;
        });

        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.loading = action.payload;
        })
    }
});



export default profileSlice.reducer;

export const {onAddPost} = profileSlice.actions;