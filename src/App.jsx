import './App.css';

import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchAuthLogin } from './components/Login/loginSlice.js';
import { useEffect } from 'react';

import Profile from './components/Profile/Profile.jsx';
import Layout from './components/Layout.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import Login from './components/Login/Login.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';
import Users from './components/Users/Users.jsx';
import NotLogged from './components/NotLogged.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

import { Provider, useSelector } from 'react-redux';

import store from './store';

const AppRoutes = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const authUserId = useSelector((state) => state.auth.userId);

    useEffect(() => {
        dispatch(fetchAuthLogin());
    }, [dispatch]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <NotLogged /> },
                {
                    path: 'profile',
                    element: isAuth ? (
                        <Navigate to={`/profile/${authUserId}`} />
                    ) : (
                        <Navigate to="/login" />
                    ),
                },
                {
                    path: 'profile/:userId',
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    ),
                },
                { path: 'login', element: <Login /> },
                {
                    path: 'dialogs',
                    element: (
                        <ProtectedRoute>
                            <Dialogs />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'users',
                    element: <Users />,
                    errorElement: <ErrorMessage message="Route error" />,
                },
                { path: '*', element: <ErrorMessage /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

const App = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <AppRoutes />
            </div>
        </Provider>
    );
};

export default App;
