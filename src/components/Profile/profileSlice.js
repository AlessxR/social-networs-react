import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "",
    isLoading: false,
    error: null,
    profile: null,
}

// get profile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (userId, {rejectWithValue}) => {
    try {
        const response = await fetch(`/api/1.0/profile/${userId}`);

        if (!response.ok) {
            return rejectWithValue({status: response.status, message: response.statusText});
        }

        const data = await response.json();

        console.log(data);

        return await data;
    } catch (e) {
        return rejectWithValue({status: 500, message: e.message});
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
            return rejectWithValue({status: response.status});
        }

        return await response.json();
    } catch (e) {
        return rejectWithValue({status: 500, message: e.message});
    }
});

// change status
export const fetchStatusChange = createAsyncThunk("profile/fetchStatusChange", async (status, {rejectWithValue}) => {
    try {
        const response = await fetch("/api/1.0/profile/status", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
            },
            credentials: "include",
            body: JSON.stringify({status})
        });

        const data = await response.json();

        if (data.resultCode !== 0) {
            return rejectWithValue(data.messages[0] || "Ошибка обновления статуса");
        }

        return status;

    } catch (e) {
        return rejectWithValue({status: 500, message: e.message});
    }
});

// change profile
export const fetchChangeProfileInformation = createAsyncThunk("profile/fetchChangeProfileInformation", async ({fullName, aboutMe, lookingForAJob, lookingForAJobDescription}, {rejectWithValue}) => {
    try {
        const response = await fetch(`/api/1.0/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
            },
            credentials: "include",
            body: JSON.stringify({fullName, aboutMe, lookingForAJob, lookingForAJobDescription})
        });

        const data = await response.json();

        console.log(data);

        return data;
    } catch(e) {
        return rejectWithValue({status: 500, message: e.message});
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
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload;
            // state.status = action.payload?.lookingForAJobDescription || undefined;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.loading = action.payload;
        });

        // profile/fetchProfileStatus
        builder.addCase(fetchProfileStatus.pending,  (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchProfileStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload;
        });
        builder.addCase(fetchProfileStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // profile/fetchStatusChange
        builder.addCase(fetchStatusChange.pending, (state, action) => {
            // state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchStatusChange.fulfilled, (state, action) => {
            // state.loading = false;
            state.status = action.payload;
        });
        builder.addCase(fetchStatusChange.rejected, (state, action) => {
            // state.loading = false;
            state.error = action.payload;
        });

        //profile/changeProfile
        builder.addCase(fetchChangeProfileInformation.pending, (state, action) => {
            state.error = null;
        });
        builder.addCase(fetchChangeProfileInformation.fulfilled, (state, action) => {
            state.profile.profile.fullName = action.payload;
            state.profile.profile.aboutMe = action.payload;

            state.profile.profile.lookingForAJob = action.payload;
            state.profile.profile.lookingForAJobDescription = action.payload;

        });
        builder.addCase(fetchChangeProfileInformation.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
});

export default profileSlice.reducer;

export const {onAddPost, onChangeStatus} = profileSlice.actions;