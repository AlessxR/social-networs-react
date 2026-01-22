import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi} from "../../services/api.js";

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
    return usersApi.getUsers(page, count);
});

export const followRequest = createAsyncThunk("users/followRequest", async (userId, {rejectWithValue}) => {
    try {
        const res = await usersApi.follow(userId);

        if (res.resultCode !== 0) {
            return rejectWithValue(res.messages);
        }

        return userId;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const followRemove = createAsyncThunk("users/followRemove", async (userId, {rejectWithValue}) => {
    try {
        const res = await usersApi.unfollow(userId);

        if (res.resultCode !== 0) {
            return rejectWithValue(res.messages);
        }

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