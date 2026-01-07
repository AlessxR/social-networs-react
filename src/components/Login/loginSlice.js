import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    email: null,
    login: null,
    loading: false,
    error: null,

}

export const fetchAuthLogin = createAsyncThunk("users/fetchAuthLogin", async (_, {rejectWithValue}) => {
    try {
        const response = await fetch("/auth/me");

        if (!response.ok) {
            return rejectWithValue(response.statusText);
        }

        const data = await response.json();

        console.log(data);

        return await data;
    } catch(error) {
        return rejectWithValue(error.message);
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthLogin.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
            state.loading = false;

            state.id = action.payload.data.id;
            state.email = action.payload.data.email;
            state.login = action.payload.data.login;

            state.error = null;
        });

        builder.addCase(fetchAuthLogin.rejected, (state, action) => {
           state.loading = false;
           // state.error = action.payload;
        });
    }
});

export default loginSlice.reducer;