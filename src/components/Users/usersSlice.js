import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    error: null,
    page: 1,
    count: 10,
    totalCount: null,
    isLoading: false,
}

// get users
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
            return rejectWithValue({status: response.statusText});
        }

        // Возвращаем данные
        return await response.json();
    } catch (e) {
        return rejectWithValue({status: 500, message: e.message});
    }
});

// get follows
export const getUserFollowed = createAsyncThunk("users/getUserFollowed", async (userId, {rejectWithValue}) => {
    try {
        const response = await fetch(`/api/1.0/follow/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        });

        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (e) {
        return rejectWithValue({status: 500, message: e.message});
    }
});

export const followRequest = createAsyncThunk("users/followRequest", async (userId, {rejectWithValue}) => {

    try {
        const response = await fetch(`/api/1.0/follow/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
                },
                credentials: "include"
            }
        );

        if (!response.ok) {
            return rejectWithValue({error: response.statusText});
        }

        const data = await response.json();

        console.log(data);

        return userId;
    } catch (e) {
        return rejectWithValue({status: 500, message: e.message});
    }
});

export const followRemove = createAsyncThunk("users/followRemove", async (userId, {rejectWithValue}) => {
    try {
        const response = await fetch(`/api/1.0/follow/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
            },
            credentials: "include"
        });

        const data = await response.json();

        console.log(data);

        return userId;
    } catch (e) {
        return rejectWithValue({error: e});
    }
});

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
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.totalCount = action.payload.totalCount;
            state.users = action.payload.items;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // toggleFollow
        builder.addCase(followRequest.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(followRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            // Получаем userId с API
            const userId = action.payload;

            // Далее перебираем users, и если userId, который пришёл с API такой же как и мы нажали по кнопке
            // То выводим определенного юзера в котором и меняет followed свойство.
            state.users = state.users.map(user =>
                user.id === userId
                    ? {...user, followed: true}
                    : user
            );
        });
        builder.addCase(followRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // removeFollow
        builder.addCase(followRemove.pending, (state, action) => {
             state.isLoading = true;
             state.error = null;
        });
        builder.addCase(followRemove.fulfilled, (state, action) => {
            state.isLoading = false;
            const userId = action.payload;
            state.users = state.users.map(user => {
                return user.id === userId ? {...user, followed: false} : user
            });
        });
        builder.addCase(followRemove.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
});

export const {changePage} = userSlice.actions;

export default userSlice.reducer;