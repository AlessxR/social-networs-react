import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "",
    loading: false,
    error: null,
    profile: null,
    changeStatus: false,
}

// get profile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (userId, {rejectWithValue}) => {

    try {
        const response = await fetch(`/api/1.0/profile/${userId}`);

        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        const data = await response.json();

        console.log(data);

        return await data;
    } catch (e) {
        console.error(e);
    }
});

// get status
export const fetchProfileStatus = createAsyncThunk("profile/fetchProfileStatus", async (userId, {rejectWithValue}) => {
    try {
        const response = await fetch(`/api/1.0/profile/status/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        return await response.json();
    } catch (e) {
        console.error(e);
    }
});

// change status
export const fetchStatusChange = createAsyncThunk("profile/fetchStatusChange", async (_, {rejectWithValue}) => {
    try {
        const response = fetch("/api/1.0/profile/status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
            },
            credentials: "include",
        });

        return await response.json();

    } catch (e) {
        console.error(e);
    }
});

// reducer
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        onAddPost: (state, action) => {
            state.posts.push(action.payload)
        },
        onChangeStatus: (state, action) => {
            state.changeStatus = !state.changeStatus;
        }
    },
    extraReducers: (builder) => {

        // profile/fetchProfile
        builder.addCase(fetchProfile.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            // state.status = action.payload?.lookingForAJobDescription || undefined;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.loading = action.payload;
        });

        // profile/fetchProfileStatus
        builder.addCase(fetchProfileStatus.pending,  (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProfileStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        });
        builder.addCase(fetchProfileStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // profile/fetchStatusChange
        builder.addCase(fetchStatusChange.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchStatusChange.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.data.status;
        });
        builder.addCase(fetchStatusChange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default profileSlice.reducer;

export const {onAddPost, onChangeStatus} = profileSlice.actions;