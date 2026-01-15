import './Header.css';

import {Link} from "react-router-dom";
import LoginElement from "./Login/LoginElement.jsx";
import Logo from "./Logo/Logo.jsx";

const Header = () => {
    return (
        <header className="header">
            <Logo />
            <LoginElement />
        </header>
    );
}

export default Header;