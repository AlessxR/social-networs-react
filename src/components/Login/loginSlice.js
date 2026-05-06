import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/api.js';

const initialState = {
    userId: null,
    email: null,
    rememberMe: false,
    login: null,
    error: null,
    isLoading: false,
    isAuth: false,
};

export const fetchAuthLogin = createAsyncThunk(
    'auth/fetchAuthLogin',
    async (_, { rejectWithValue }) => {
        try {
            const res = await authApi.auth();

            if (res.resultCode !== 0) {
                return rejectWithValue(res.messages?.[0] || 'Not authorized');
            }

            return res;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

export const fetchLoginWithData = createAsyncThunk(
    'auth/fetchLoginWithData',
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const res = await authApi.authWithData({ email, password });


            if (res.resultCode !== 0) {
                return rejectWithValue(res.messages?.[0] || 'Login failed');
            }

            await dispatch(fetchAuthLogin());

            return res;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

export const fetchLogout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await authApi.logout();

            if (res.resultCode !== 0) {
                return rejectWithValue(res.messages?.[0] || 'Logout failed');
            }

            return res;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // auth/me
        builder.addCase(fetchAuthLogin.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
            state.isLoading = false;

            if (action.payload.resultCode === 0) {
                state.userId = action.payload.data.id;
                state.email = action.payload.data.email;
                state.login = action.payload.data.login;
                state.isAuth = true;
                state.error = null;
            } else {
                state.isAuth = false;
                state.error = action.payload.messages?.[0] || 'Auth error';
            }
        });
        builder.addCase(fetchAuthLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // auth/login
        builder.addCase(fetchLoginWithData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchLoginWithData.fulfilled, (state, action) => {
            state.isLoading = false;

            state.userId = action.payload.data.userId;
            state.isAuth = true;

            state.error = null;
        });

        builder.addCase(fetchLoginWithData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // auth/logout
        builder.addCase(fetchLogout.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchLogout.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;

            state.userId = null;
            state.login = null;
            state.email = null;

            state.isAuth = false;
        });
        builder.addCase(fetchLogout.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export default loginSlice.reducer;
