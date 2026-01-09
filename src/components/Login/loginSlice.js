import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    email: null,
    password: null,
    rememberMe: false,
    login: null,
    loading: false,
    error: null,
    isAuth: false,
}

export const fetchAuthLogin = createAsyncThunk("users/fetchAuthLogin", async (_, {rejectWithValue}) => {
    try {
        const response = await fetch(
            "/api/1.0/auth/me",
            {
                credentials: "include",
                method: "GET",
                headers: {
                    "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
                },
            }
        );

        if (!response.ok) {
            return rejectWithValue(response.statusText);
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchLoginWithData = createAsyncThunk("users/fetchLoginWithData", async ({email, password}, {rejectWithValue}) => {
    try {

        const response = await fetch("/api/1.0/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            return rejectWithValue(response.statusText);
        }

        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // auth/me
        builder.addCase(fetchAuthLogin.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
            state.loading = false;

            state.id = action.payload.data.id;
            state.email = action.payload.data.email;
            state.login = action.payload.data.login;

            state.isAuth = true;

            state.error = null;
        });
        builder.addCase(fetchAuthLogin.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload;
        });

        // auth/login
        builder.addCase(fetchLoginWithData.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchLoginWithData.fulfilled, (state, action) => {
            state.loading = false;

            state.id = action.payload.data.userId;
            state.email = action.payload;
            state.password = action.payload;

            state.isAuth = true;

            state.error = null;
        });

        builder.addCase(fetchLoginWithData.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload;
        });
    }
});

export default loginSlice.reducer;