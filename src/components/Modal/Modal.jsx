import {Box, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {fetchChangeProfileInformation} from "../Profile/profileSlice.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ProfileModal = ({open, onClose}) => {

    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.profile);

    const [fullName, setFullName] = useState(null);
    const [aboutMe, setAboutMe] = useState(null);
    const [lookingForAJob, setLookingForAJob] = useState(null);
    const [lookingForAJobDescription, setLookingForAJobDescription] = useState(null);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6">
                    Редактировать профиль
                </Typography>

                <Typography sx={{mt: 2}}>
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className="general" style={{display: "flex", flexDirection: "column"}}>
                            <h3>General info</h3>

                            <label htmlFor="">Your name: </label>
                            <input onChange={e => setFullName(e.target.value)} type={"text"} value={profile.fullName}
                                   placeholder="Your name"/>

                            <label htmlFor="">Your name:</label>
                            <input onChange={e => setAboutMe(e.target.value)} type={"text"} value={profile.aboutMe}
                                   placeholder="Change about me info"/>
                        </div>

                        <hr/>

                        <div className="job" style={{display: "flex", flexDirection: "column"}}>
                            <h3>Job status: </h3>

                            <label htmlFor="">Looking for a job:</label>
                            <input onChange={e => setLookingForAJob(e.target.value)} type={"checkbox"}
                                   value={profile.lookingForAJob} placeholder="Change about me info"/>

                            <label htmlFor="">Job description:</label>
                            <input onChange={e => setLookingForAJobDescription(e.target.value)} type={"text"}
                                   value={profile.lookingForAJobDescription} placeholder="Change about me info"/>
                        </div>

                        <hr/>

                        <div className="contacts">
                            <h3>Contacts</h3>

                            <div style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="">Facebook:</label>
                                <input type={"text"} value={profile.contacts.facebook}
                                       placeholder="Change about me info"/>

                                <label htmlFor="">GitHub:</label>
                                <input type={"text"} value={profile.contacts.github}
                                       placeholder="Change about me info"/>

                                <label htmlFor="">Twitter:</label>
                                <input type={"text"} value={profile.contacts.twitter}
                                       placeholder="Change about me info"/>
                            </div>
                        </div>
                        <button onClick={dispatch(fetchChangeProfileInformation({
                            fullName,
                            aboutMe,
                            lookingForAJob,
                            lookingForAJobDescription
                        }))} style={{textAlign: "center"}} type="submit">Save
                        </button>
                    </form>
                </Typography>
            </Box>
        </Modal>
    );
};

export default ProfileModal;
