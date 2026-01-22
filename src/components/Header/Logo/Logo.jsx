import {Link} from "react-router-dom";

import './Logo.css';

const Logo = () => {
    return (
        <div className="header__logo">
            <Link to="/">
                <img src="/logo.png" height={50} width={50} className="header__logo-img" alt="logo"/>
                Social Network
            </Link>
        </div>
    )
}

export default Logo;