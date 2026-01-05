import './Dialogs.css';

import Dialog from "./Dialog/Dialog.jsx";

const Dialogs = () => {
    return (
        <div className="dialogs">
            <h2>Dialogs</h2>
            <Dialog />
            <Dialog />
            <Dialog />
        </div>
    )
}

export default Dialogs;