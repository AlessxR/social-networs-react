import { Box, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    fetchChangeProfileInformation,
} from '../Profile/profileSlice.js';

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

const ProfileModal = ({ open, onClose, isOwner }) => {
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.profile);

    const [fullName, setFullName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [lookingForAJob, setLookingForAJob] = useState(false);
    const [lookingForAJobDescription, setLookingForAJobDescription] =
        useState('');

    useEffect(() => {
        if (profile && open) {
            setFullName(profile.fullName || '');
            setAboutMe(profile.aboutMe || '');
            setLookingForAJob(profile.lookingForAJob || false);
            setLookingForAJobDescription(
                profile.lookingForAJobDescription || '',
            );
        }
    }, [profile, open]);

    const handleClose = () => {
        if (onClose) onClose(); // закрываем модалку в родителе
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Редактировать профиль</Typography>

                <Typography component="div" sx={{ mt: 2 }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div
                            className="general"
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <h3>General info</h3>

                            <label htmlFor="">Your name: </label>
                            <input
                                onChange={(e) => setFullName(e.target.value)}
                                type={'text'}
                                value={fullName}
                                disabled={!isOwner}
                                placeholder="Your name"
                            />

                            <label htmlFor="">Your information:</label>
                            <input
                                onChange={(e) => setAboutMe(e.target.value)}
                                type={'text'}
                                value={aboutMe}
                                disabled={!isOwner}
                                placeholder="Change about me info"
                            />
                        </div>
                        <div
                            className="job"
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <h3>Job status: </h3>

                            <label htmlFor="">Looking for a job:</label>
                            <input
                                onChange={(e) =>
                                    setLookingForAJob(e.target.checked)
                                }
                                disabled={!isOwner}
                                type={'checkbox'}
                                checked={lookingForAJob}
                                value={lookingForAJob}
                                placeholder="Change about me info"
                            />

                            <label htmlFor="">Job description:</label>
                            <input
                                onChange={(e) =>
                                    setLookingForAJobDescription(e.target.value)
                                }
                                disabled={!isOwner}
                                type={'text'}
                                value={lookingForAJobDescription}
                                placeholder="Change about me info"
                            />
                        </div>
                        <div className="contacts">
                            <h3>Contacts</h3>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <label htmlFor="">Facebook:</label>
                                <input
                                    readOnly
                                    type={'text'}
                                    value={profile.contacts.facebook}
                                    placeholder="Change about me info"
                                />

                                <label htmlFor="">GitHub:</label>
                                <input
                                    readOnly
                                    type={'text'}
                                    value={profile.contacts.github}
                                    placeholder="Change about me info"
                                />

                                <label htmlFor="">Twitter:</label>
                                <input
                                    readOnly
                                    type={'text'}
                                    value={profile.contacts.twitter}
                                    placeholder="Change about me info"
                                />
                            </div>
                        </div>
                        {isOwner && (
                            <button
                                onClick={() =>
                                    dispatch(
                                        fetchChangeProfileInformation({
                                            ...profile,
                                            fullName,
                                            aboutMe,
                                            lookingForAJob,
                                            lookingForAJobDescription,
                                            contacts: {
                                                ...profile.contacts,
                                            },
                                        }),
                                    )
                                }
                                style={{ textAlign: 'center' }}
                                type="submit"
                            >
                                Save
                            </button>
                        )}
                    </form>
                </Typography>
            </Box>
        </Modal>
    );
};

export default ProfileModal;
