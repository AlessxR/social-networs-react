import './Profile.css';

import Post from "./Post/Post.jsx";

import {useDispatch, useSelector} from "react-redux";
import {fetchProfile, onAddPost} from "./profileSlice.js";
import {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";

const Profile = () => {

    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const authUserId = useSelector(state => state.auth.id);

    const { userId } = useParams(); // берём id из URL
    const idToFetch = userId || authUserId; // если нет id в URL, берём свой


    const posts = useSelector(state => state.profile.posts);

    const profile = useSelector(state => state.profile.profile);
    const profileStatus = useSelector(state => state.profile.status);

    const loading = useSelector(state => state.profile.loading);


    useEffect(() => {
        if (idToFetch) {
            dispatch(fetchProfile(idToFetch));
        }
    }, [dispatch, idToFetch]);

    if (loading) return <Preloader />


    const handleAdd = () => {
        dispatch(onAddPost(text));
        setText("");
    }

    return (
        <div className="profile">
            <div className="profile__logo">
                <img width={"100%"} height={100}
                     src="https://png.pngtree.com/thumb_back/fh260/background/20250205/pngtree-soft-pastel-floral-design-light-blue-background-image_16896113.jpg"
                     alt="Profile logo" className="profile__logo-img"/>
            </div>

            <div className="profile__info">
                {
                    profile && (
                        <div className="profile__info__about">
                            <div className="profile__info__about-img">
                                <img height={150} width={150}
                                     src={profile.photos.large || "https://png.klev.club/uploads/posts/2024-04/png-klev-club-v3lo-p-avatarka-png-2.png"}
                                     alt=""/>
                            </div>


                            <div className="porofile__info__about__descr">
                                <span>Current status: {profileStatus || "Undefined status"}</span>
                                <p>Name: {profile.fullName}</p>
                                <p>Websites: {profile.contacts.facebook || "Не указано!"}</p>
                            </div>
                        </div>
                    )
                }

                <div className="profile__posts">
                    <h3>My posts</h3>
                    <div className="profile__posts__add">
                        <textarea onChange={(e) => setText(e.target.value)} value={text}/>

                        <button onClick={handleAdd}>Add new post</button>
                    </div>
                    <div className="profile__posts__data">
                        <Post/>
                        {
                            posts.map(post => <Post post={post}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;