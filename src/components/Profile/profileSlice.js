import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: null,
    userId: null,
    loading: false,
    error: null
}

const apiLink = `/api/profile/status/10`;


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
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, state => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        });

        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.loading = action.payload;
        })
    }
});



export default profileSlice.reducer;

export const {onAddPost} = profileSlice.actions;