import {fetchLogout} from "../../Login/loginSlice.js";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const LoginElement = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <div className="header__login">
            {
                isAuth ?
                    <button onClick={() => dispatch(fetchLogout())}>Log out</button> : <Link to="/login">Log in</Link>
            }
        </div>
    );
}

export default LoginElement;