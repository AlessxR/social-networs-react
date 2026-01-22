import Post from "./Post/Post.jsx";
import {onAddPost} from "../profileSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

const Posts = () => {

    const dispatch = useDispatch();

    const [text, setText] = useState(null);

    const posts = useSelector(state => state.profile.posts);


    const handleAdd = () => {
        if (!text) {
            return;
        } else {
            dispatch(onAddPost(text));
            setText("");
        }
    }

    return (
        <div className="profile__posts">
            <h3>Мои посты:</h3>
            <div className="profile__posts__add">
                <textarea onChange={(e) => setText(e.target.value)} value={text}/>
                <button onClick={handleAdd}>Добавить новый пост</button>
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