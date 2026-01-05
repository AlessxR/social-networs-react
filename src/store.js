import {configureStore} from "@reduxjs/toolkit";
import profileSlice from "./components/Profile/profileSlice.js";

const store = configureStore({
    reducer: {
        profile: profileSlice,
    }
});

export default store;