import {configureStore} from "@reduxjs/toolkit";

import profileSlice from "./components/Profile/profileSlice.js";
import usersSlice from "./components/Users/usersSlice.js";

const store = configureStore({
    reducer: {
        profile: profileSlice,
        users: usersSlice,
    }
});

export default store;