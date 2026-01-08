import './Header.css';
import {useSelector} from "react-redux";

const Header = () => {

    const login = useSelector(state => state.auth.login);

    const isAuth = useSelector(state => state.auth.isAuth);

    console.log(login);

    return (
        <header className="header">
            <div className="header__logo">
                <a href="#">
                    <img src="/logo.png" height={50} width={50} className="header__logo-img" alt="logo"/>
                </a>
            </div>

            <div className="header__login">
                <a href={"/login"} className="header__login-btn">{isAuth ? login : "Log in"}</a>
            </div>
        </header>
    );
}

export default Header;