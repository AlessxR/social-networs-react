import {useDispatch} from "react-redux";

import {fetchAuthLogin, fetchLoginWithData} from "./loginSlice.js";

import './Login.css';

const Login = () => {

    const dispatch = useDispatch();

    return (
        <form className="login" onSubmit={(e) => e.preventDefault()}>

            <div className="login__email">
                <label>Email</label>
                <input id="email" type="email" />
            </div>

            <div className="login__password">
                <label>Password</label>
                <input type="password" id="password" />
            </div>
            <button onClick={() => dispatch(fetchLoginWithData())}>Auth</button>
        </form>
    );
}

export default Login;