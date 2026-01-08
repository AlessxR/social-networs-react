import './Users.css';

import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import {changePage, fetchUsers, toggleFollow} from "./usersSlice.js";

import {Link, Navigate} from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";
import {Pagination} from "@mui/material";

const Users = () => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.loading);

    const page = useSelector((state) => state.users.page);

    // const page = 1;
    const count = 5;

    useEffect(() => {
        dispatch(fetchUsers({page, count}));
    }, [dispatch, page, count]);

    const handlePageChange = (event, value) => {
        dispatch(changePage(value));
    }

    if (loading) return <Preloader />;

    return (
        <div className="users">
            <h2>Users</h2>
            {/*<button onClick={() => dispatch(fetchUsers())}>Get Data</button>*/}
            <Pagination defaultPage={1} count={count} page={page} onChange={handlePageChange} color={"secondary"} />

            {
                users.map(user => (
                    <div key={user.id} className="users__container">
                        <div className="users__infomation">
                            <Link to={`/profile/${user.id}`}>
                                <img height={100}
                                     src={user.photos.small || "https://png.klev.club/uploads/posts/2024-04/png-klev-club-v3lo-p-avatarka-png-2.png"}
                                     alt="Image"
                                />
                            </Link>
                            <button onClick={() => dispatch(toggleFollow(user.id))}>
                                {user.followed ? "Unfollow" : "Follow"}
                            </button>
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