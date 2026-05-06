import './App.css';

import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';

import Profile from './components/Profile/Profile.jsx';
import Layout from './components/Layout.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import Login from './components/Login/Login.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';
import Users from './components/Users/Users.jsx';
import NotLogged from './components/NotLogged.jsx';

import { Provider, useSelector } from 'react-redux';

import store from './store';

const AppRoutes = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const authUserId = useSelector((state) => state.auth.userId);

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
                { path: 'profile/:userId', element: <Profile /> },
                { path: 'login', element: <Login /> },
                { path: 'dialogs', element: <Dialogs /> },
                { path: 'users', element: <Users /> },
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
