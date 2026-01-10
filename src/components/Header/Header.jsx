import './Header.css';
import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";
import {fetchLogout} from "../Login/loginSlice.js";

const Header = () => {

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.auth.isAuth);

    console.log("Current auth: " + isAuth);

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src="/logo.png" height={50} width={50} className="header__logo-img" alt="logo"/>
                </Link>
            </div>

            <div className="header__login">
                {
                    isAuth ?
                        <button onClick={() => dispatch(fetchLogout())}>Log out</button> : <Link to="/login">Log in</Link>
                }
            </div>
        </header>
    );
}

export default Header;