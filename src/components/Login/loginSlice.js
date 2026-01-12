import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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
        return rejectWithValue({status: 500, message: error.message});
    }
});

export const fetchLoginWithData = createAsyncThunk("auth/fetchLoginWithData", async ({email, password}, {rejectWithValue}) => {
    try {

        const response = await fetch("/api/1.0/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
            },
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            return rejectWithValue(response.statusText);
        }

        return response.json();
    } catch (error) {
        return rejectWithValue({status: 500, message: error.message});
    }
});

export const fetchLogout = createAsyncThunk("auth/logout", async (_, {rejectWithValue}) => {
    try {
        const response = await fetch("/api/1.0/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
            },
        });

        if (!response.ok) {
            return rejectWithValue(response.statusText);
        }

        return true;
    } catch(e) {
        return rejectWithValue({status: 500, message: e.message});
    }
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