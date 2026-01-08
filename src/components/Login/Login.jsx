import {useDispatch, useSelector} from "react-redux";

import {fetchAuthLogin, fetchLoginWithData} from "./loginSlice.js";

import './Login.css';

import {useState} from "react";
import Preloader from "../Preloader/Preloader.jsx";
import {Navigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loading = useSelector(state => state.auth.loading);
    const isAuth = useSelector(state => state.auth.isAuth);

    if (isAuth) return <Navigate to="/profile" />

    if (loading) return <Preloader />;


    return (
        <form className="login" onSubmit={(e) => e.preventDefault()}>
            <button onClick={() => dispatch(fetchAuthLogin())}>AUTH ME</button>

            <div className="login__email">
                <label>Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="login__password">
                <label>Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={() => dispatch(fetchLoginWithData({email, password}))}>Auth</button>
        </form>
    );
}

export default Login;