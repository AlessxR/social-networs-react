import './App.css';

import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Profile from "./components/Profile/Profile.jsx";

const App = () => {
    return (
        <div className="app">
            <Header />

            <main className="main">
                <Sidebar />
                <Profile />
            </main>
        </div>
    );
}

export default App;