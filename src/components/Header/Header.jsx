import './Header.css';
import {useSelector} from "react-redux";

import {Link} from "react-router-dom";

const Header = () => {

    const isAuth = useSelector(state => state.auth.isAuth);

    console.log("Current auth: " + isAuth);

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/profile">
                    <img src="/logo.png" height={50} width={50} className="header__logo-img" alt="logo"/>
                </Link>
            </div>

            <div className="header__login">
                <Link to={"/login"} className="header__login-btn">{isAuth ? "Log out" : "Log in"}</Link>
            </div>
        </header>
    );
}

export default Header;