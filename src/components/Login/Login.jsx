import {useDispatch} from "react-redux";

import {fetchAuthLogin} from "./loginSlice.js";

const Login = () => {

    const dispatch = useDispatch();

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>Email</label>
            <input id="email" type="email" />

            <button onClick={() => dispatch(fetchAuthLogin())}>GET</button>
        </form>
    );
}

export default Login;