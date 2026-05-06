import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { profileApi } from '../../services/api.js';

const initialState = {
    posts: [],
    status: '',
    isLoading: false,
    error: null,
    profile: null,
};

// get profile
export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (userId, { rejectWithValue }) => {
        try {
            return profileApi.getProfile(userId);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

// get status
export const fetchProfileStatus = createAsyncThunk(
    'profile/fetchProfileStatus',
    async (userId, { rejectWithValue }) => {
        try {
            return profileApi.getProfileStatus(userId);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

// change status
export const fetchStatusChange = createAsyncThunk(
    'profile/fetchStatusChange',
    async (status, { rejectWithValue }) => {
        try {
            const res = await profileApi.changeProfileStatus(status);

            if (res.resultCode !== 0) {
                return rejectWithValue(
                    res.messages?.[0] || 'Change status failed',
                );
            }

            return res;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

// change profile
export const fetchChangeProfileInformation = createAsyncThunk(
    'profile/fetchChangeProfileInformation',
    async (
        { fullName, aboutMe, lookingForAJob, lookingForAJobDescription },
        { rejectWithValue },
    ) => {
        try {
            const res = await profileApi.changeProfile({
                fullName,
                aboutMe,
                lookingForAJob,
                lookingForAJobDescription,
            });

            if (res.resultCode !== 0) {
                return rejectWithValue(
                    res.messages?.[0] || 'Change information failed!',
                );
            }
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

// reducer
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        onAddPost: (state, action) => {
            state.posts.push(action.payload);
        },
        onChangeStatus: (state) => {
            state.changeStatus = !state.changeStatus;
        },
    },
    extraReducers: (builder) => {
        // profile/fetchProfile
        builder.addCase(fetchProfile.pending, (state) => {
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
            state.error = action.payload;
        });

        // profile/fetchProfileStatus
        builder.addCase(fetchProfileStatus.pending, (state) => {
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
        builder.addCase(fetchStatusChange.pending, (state) => {
            // state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchStatusChange.fulfilled, (state, action) => {
            // state.loading = false;
            state.status = action.payload.data.status;
        });
        builder.addCase(fetchStatusChange.rejected, (state, action) => {
            // state.loading = false;
            state.error = action.payload;
        });

        //profile/changeProfile
        builder.addCase(fetchChangeProfileInformation.pending, (state) => {
            state.error = null;
        });
        builder.addCase(
            fetchChangeProfileInformation.fulfilled,
            (state, action) => {
                state.profile.profile.fullName = action.payload.data.fullName;
                state.profile.profile.aboutMe = action.payload.data.aboutMe;

                state.profile.profile.lookingForAJob =
                    action.payload.data.lookingForAJob;
                state.profile.profile.lookingForAJobDescription =
                    action.payload.data.lookingForAJobDescription;
            },
        );
        builder.addCase(
            fetchChangeProfileInformation.rejected,
            (state, action) => {
                state.error = action.payload;
            },
        );
    },
});

export default profileSlice.reducer;

export const { onAddPost, onChangeStatus } = profileSlice.actions;
