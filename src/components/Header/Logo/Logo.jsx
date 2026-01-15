import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <div className="header__logo">
            <Link to="/">
                <img src="/logo.png" height={50} width={50} className="header__logo-img" alt="logo"/>
            </Link>
        </div>
    )
}

export default Logo;