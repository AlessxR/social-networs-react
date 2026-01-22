import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {profileApi} from "../../services/api.js";

const initialState = {
    posts: [],
    status: "",
    isLoading: false,
    error: null,
    profile: null,
}

// get profile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (userId, {rejectWithValue}) => {
    return profileApi.getProfile(userId);
});

// get status
export const fetchProfileStatus = createAsyncThunk("profile/fetchProfileStatus", async (userId, {rejectWithValue}) => {
    return profileApi.getProfileStatus(userId);
});

// change status
export const fetchStatusChange = createAsyncThunk("profile/fetchStatusChange", async (status, {rejectWithValue}) => {
    return profileApi.changeProfileStatus(status);
});

// change profile
export const fetchChangeProfileInformation = createAsyncThunk("profile/fetchChangeProfileInformation", async ({fullName, aboutMe, lookingForAJob, lookingForAJobDescription}, {rejectWithValue}) => {
    return profileApi.changeProfile({fullName, aboutMe, lookingForAJob, lookingForAJobDescription});
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