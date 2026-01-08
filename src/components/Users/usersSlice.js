import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: null,
    page: 1,
    count: 10
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async ({page = 1, count = 10}, {rejectWithValue}) => {
    // Делаем запрос на API
    try {

        // Тут можно получить данные с помощью query-string
        // Query Parameters
        // count: (integer - default: 10 - maximum: 100)
        // page size (how many items will be returned in response)
        //
        // page: (integer - default: 1)
        // number of portion of items
        //
        // term: (string)
        // user name string for searching
        // friend: (boolean)
        // if true, then find only followed users, false - only not followed users, if omit parameter - all users

        const response = await fetch(`/api/1.0/users?page=${page}&count=${count}`);

        // Если не норм - возвращаем ошибку
        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        // Возвращаем данные
        return await response.json();
    } catch (e) {
        console.error(e);
    }
});

export const toggleFollow = createAsyncThunk(
    "users/toggleFollow", async (userId = 2, {rejectWithValue}) => {
        try {
            const response = await fetch(`/api/follow/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (!response.ok) {
                return rejectWithValue({error: response.statusText});
            }

            const data = await response.json();

            console.log(data);

            return await data;
        } catch (e) {
            console.error(e);
        }
    }
);
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {

        // fetchUsers
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
        });

        // toggleFollow
        builder.addCase(toggleFollow.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(toggleFollow.fulfilled, (state, action) => {
            state.loading = false;
            const updateUser = action.payload;
            state.users = state.users.map(user => user.id === updateUser.id ? updateUser : user);
        });
        builder.addCase(toggleFollow.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const { changePage } = userSlice.actions;

export default userSlice.reducer;