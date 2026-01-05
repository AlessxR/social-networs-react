import "./Sidebar.css";
import {NavLink} from "react-router-dom";


const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                <NavLink to={"profile"} className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>Profile</NavLink>
                <NavLink to={"users"} className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>Users</NavLink>
                <NavLink to={"dialogs"} className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>Messages</NavLink>
                <NavLink to={"news"} className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>News</NavLink>
                <NavLink to={"music"} className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>Music</NavLink>
            </ul>
        </aside>
    );
}

export default Sidebar;