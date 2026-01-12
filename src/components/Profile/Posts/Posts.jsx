import Post from "./Post/Post.jsx";
import {onAddPost} from "../profileSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

const Posts = () => {

    const dispatch = useDispatch();

    const [text, setText] = useState("");

    const posts = useSelector(state => state.profile.posts);


    const handleAdd = () => {
        dispatch(onAddPost(text));
        setText("");
    }

    return (
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
    )
}

export default Posts;