import Header from "./Header/Header.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";

import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header/>

            <main className="main">
                <Sidebar/>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;