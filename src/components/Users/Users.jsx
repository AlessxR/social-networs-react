import './Users.css';

import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "./usersSlice.js";

const Users = () => {
    const dispatch = useDispatch();

    const [follow, setFollow] = useState(false);

    const users = useSelector((state) => state.users.users);

    const onFollow = () => {
        setFollow(!follow);
    }

    console.log(users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="users">
            <h2>Users</h2>
            {/*<button onClick={() => dispatch(fetchUsers())}>Get Data</button>*/}
            {
                users.map(user => (
                    <div className="users__container">
                        <div className="users__infomation">
                            <img height={100} src={user.photos.small || "https://png.klev.club/uploads/posts/2024-04/png-klev-club-v3lo-p-avatarka-png-2.png"} alt="Image"/>
                            <button onClick={onFollow}>{user.followed ? "unfollow" : "follow"}</button>
                        </div>

                        <div className="users__infomation__detail">
                            <span>Name: {user.name}</span>
                            <span>Description: {user.status}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Users;