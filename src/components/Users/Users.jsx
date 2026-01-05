import './Users.css';

const Users = () => {
    return (
        <div className="users">
            <h2>Users</h2>
            <div className="users__container">
                <div className="users__infomation">
                    <img src="" alt="Image"/>
                    <button>Follow</button>
                </div>

                <div className="users__infomation__detail">
                    <span>Name:</span>
                    <span>Country:</span>
                    <span>Description:</span>
                </div>
            </div>
        </div>
    );
}

export default Users;