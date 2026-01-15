import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchData} from "../../services/api.js";

const initialState = {
    userId: null,
    email: null,
    // password: null,
    rememberMe: false,
    login: null,
    error: null,
    isLoading: false,
    isAuth: false,
}

export const fetchAuthLogin = createAsyncThunk("auth/fetchAuthLogin", async (_, {rejectWithValue}) => {
    return fetchData("/api/1.0/auth/me", "GET", rejectWithValue);
});

export const fetchLoginWithData = createAsyncThunk("auth/fetchLoginWithData", async ({email, password}, {rejectWithValue}) => {
    return fetchData("/api/1.0/auth/login", "POST", rejectWithValue, JSON.stringify({email, password}));
});

export const fetchLogout = createAsyncThunk("auth/logout", async (_, {rejectWithValue}) => {
    return fetchData("/api/1.0/auth/logout", "POST", rejectWithValue);
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // auth/me
        builder.addCase(fetchAuthLogin.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
            state.isLoading = false;

            state.userId = action.payload.data.userId;
            state.email = action.payload.data.email;
            state.login = action.payload.data.login;

            state.isAuth = true;

            state.error = null;
        });
        builder.addCase(fetchAuthLogin.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.payload;
        });

        // auth/login
        builder.addCase(fetchLoginWithData.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchLoginWithData.fulfilled, (state, action) => {
            state.isLoading = false;

            state.userId = action.payload.data.userId;
            state.login = action.payload.data.fullName;
            state.email = action.payload;

            state.isAuth = true;
            state.error = null;
        });
        builder.addCase(fetchLoginWithData.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.payload;
        });

        // auth/logout
        builder.addCase(fetchLogout.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;

            state.userId = null;
            state.login = null;
            state.email = null;
            state.password = null;

            state.isAuth = false;
        });
        builder.addCase(fetchLogout.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
});

export default loginSlice.reducer;