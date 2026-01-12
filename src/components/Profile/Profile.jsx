import './Profile.css';

import Post from "./Posts/Post/Post.jsx";

import {useDispatch, useSelector} from "react-redux";
import {fetchProfile, fetchProfileStatus, fetchStatusChange, onAddPost} from "./profileSlice.js";

import {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";
import {Button} from "@mui/material";
import ProfileModal from "../Modal/Modal.jsx";
import ProfileLogo from "./ProfileLogo/ProfileLogo.jsx";
import Posts from "./Posts/Posts.jsx";

const Profile = () => {

    const [edit, setEdit] = useState(false);

    const [open, setOpen] = useState(false);
    const toggleModal = () => setOpen(prev => !prev);

    const dispatch = useDispatch();

    const authUserId = useSelector(state => state.auth.userId);

    const {userId} = useParams(); // берём id из URL
    const idToFetch = userId || authUserId; // если нет id в URL, берём свой

    const profile = useSelector(state => state.profile.profile);

    // Получаем статус пользователя
    const profileStatus = useSelector(state => state.profile.status);

    // Храним локальный статус, чтобы не делать миллиард запросов
    const [localStatus, setLocalStatus] = useState(profileStatus);


    const loading = useSelector(state => state.profile.isLoading);

    useEffect(() => {
        if (idToFetch) {
            dispatch(fetchProfile(idToFetch));
        }
        dispatch(fetchProfileStatus(idToFetch));
    }, [dispatch, idToFetch]);

    useEffect(() => {
        setLocalStatus(profileStatus);
    }, [profileStatus]);

    if (loading) return <Preloader/>;


    // Включаем режим редактирования
    const handleStatusEdit = () => setEdit(true);

    // Убираем режим редактирования
    const handleBlur = () => {
        setEdit(false);

        // Если локальный статус не такой как profileStatus, то хуярим его на API
        if (localStatus !== profileStatus) {
            dispatch(fetchStatusChange(localStatus));
        }
    };

    console.log(edit);

    return (
        <div className="profile">
            <ProfileLogo />
            <div className="profile__info">
                {
                    profile && (
                        <div className="profile__info__about">
                            <div className="profile__info__about-img">
                                <img height={150} width={150}
                                     src={profile.photos.large || "https://png.klev.club/uploads/posts/2024-04/png-klev-club-v3lo-p-avatarka-png-2.png"}
                                     alt=""
                                />
                            </div>

                            <div className="porofile__info__about__descr">
                                <Button
                                    onClick={toggleModal}
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                >
                                    Больше информации о профиле
                                </Button>

                                <ProfileModal
                                    open={open}
                                    onClose={toggleModal}
                                />

                                <p style={{fontWeight: "bold"}}>{profile.fullName}</p>
                                {!edit && <span onDoubleClick={handleStatusEdit}>{profileStatus || "-----"}</span>}
                                {edit && <input
                                    type="text"
                                    value={localStatus}
                                    /* Добавляем новый статус в локальный */
                                    onChange={e => setLocalStatus(e.target.value)}
                                    onBlur={handleBlur}
                                    defaultValue={profileStatus}
                                />}
                            </div>
                        </div>
                    )
                }
                <Posts  />
            </div>
        </div>
    )
}

export default Profile;