import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    users: [],
    loading: false,
    error: null
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, {rejectWithValue}) => {
    try {
        const response = await fetch('/api/users');

        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        return await response.json();
    } catch(e) {
        console.error(e);
    }
});

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.items;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default userSlice.reducer;

export const {fetchData, fetchSuccess, fetchError} = userSlice.actions;