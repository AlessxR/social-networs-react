import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <a href="#">
                    <img src="/logo.png" height={50} width={50} className="header__logo-img" alt="logo"/>
                </a>
            </div>

            <div className="header__login">
                <a href={"/login"} className="header__login-btn">Login</a>
            </div>
        </header>
    );
}

export default Header;