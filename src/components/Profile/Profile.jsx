import './Profile.css';

import Post from "./Post/Post.jsx";

const Profile = () => {
    return (
        <div className="profile">
            <div className="profile__logo">
                <img width={"100%"} height={100} src="https://png.pngtree.com/thumb_back/fh260/background/20250205/pngtree-soft-pastel-floral-design-light-blue-background-image_16896113.jpg" alt="Profile logo" className="profile__logo-img"/>
            </div>

            <div className="profile__info">
                <div className="profile__info__about">
                    <div className="profile__info__about-img">
                        <img height={150} width={150} src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-v3lo-p-avatarka-png-2.png" alt=""/>
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
                    <div>
                        <Post />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;