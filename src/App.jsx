import './App.css';

import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import Profile from "./components/Profile/Profile.jsx";
import Layout from "./components/Layout.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import Login from "./components/Login/Login.jsx";
import Dialogs from "./components/Dialogs/Dialogs.jsx";

import {Provider} from "react-redux";

import store from "./store";
import Users from "./components/Users/Users.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            { path: "/profile", element: <Navigate to="/profile/1" replace /> },
            {path: "/profile/:userId", element: <Profile/>},
            {path: "/login", element: <Login/>},
            {path: "/dialogs", element: <Dialogs/>},
            {path: "/users", element: <Users/>},
            {path: "*", element: <ErrorMessage/>}
        ]
    }
]);

const App = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <RouterProvider router={router}>
                </RouterProvider>
            </div>
        </Provider>
    );
}

export default App;