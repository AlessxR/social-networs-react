import './Profile.css';

import Post from "./Post/Post.jsx";

import {useDispatch, useSelector} from "react-redux";
import {onAddPost} from "./profileSlice.js";
import {useState} from "react";

const Profile = () => {

    const posts = useSelector(state => state.profile.posts);

    const [text, setText] = useState("");
    const dispatch = useDispatch();

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
                <div className="profile__info__about">
                    <div className="profile__info__about-img">
                        <img height={150} width={150}
                             src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-v3lo-p-avatarka-png-2.png"
                             alt=""/>
                    </div>

                    <div className="porofile__info__about__descr">
                        <p>Name</p>
                        <p>Date of birthday</p>
                        <p>City: </p>
                        <p>Education</p>
                        <p>Website</p>
                    </div>
                </div>

                <div className="profile__posts">
                    <h3>My posts</h3>
                    <div className="profile__posts__add">
                        <textarea onChange={(e) => setText(e.target.value)} value={text}/>

                        <button onClick={handleAdd}>Add new post</button>
                    </div>
                    <div className="profile__posts__data">
                        <Post />
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