import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                <li className="sidebar__list-item">Profile</li>
                <li className="sidebar__list-item">Messages</li>
                <li className="sidebar__list-item">News</li>
                <li className="sidebar__list-item">Music</li>
            </ul>
        </aside>
    );
}

export default Sidebar;