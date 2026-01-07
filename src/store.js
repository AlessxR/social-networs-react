import {configureStore} from "@reduxjs/toolkit";

import profileSlice from "./components/Profile/profileSlice.js";
import usersSlice from "./components/Users/usersSlice.js";
import loginSlice from "./components/Login/loginSlice.js";

const store = configureStore({
    reducer: {
        profile: profileSlice,
        users: usersSlice,
        auth: loginSlice
    }
});

export default store;