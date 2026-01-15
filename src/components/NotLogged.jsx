import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const NotLogged = () => {
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>This is social network!</h1>
            <Link to="/profile">Go to your profile</Link>
            <Link to="/dialogs">Go to your messages</Link>
            <Link to="/users">Go to all social network registered users</Link>

            {
                !isAuth && <Link to="/login">Go to login</Link>
            }
        </div>
    );
}

export default NotLogged;