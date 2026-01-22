import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: '/api/1.0',
    headers: {
        'Content-Type': 'application/json',
        "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
    },
});

instance.interceptors.response.use(
    response => response.data,
    error => {
        return Promise.reject(error)
    }
);

export const usersApi = {
    getUsers(page = 1, count = 10) {
        return instance.get(`/users?page=${page}&count=${count}`)
    },

    follow(userId) {
        return instance.post(`/follow/${userId}`)
    },

    unfollow(userId) {
        return instance.delete(`/follow/${userId}`)
    }
}

export const profileApi = {

    getProfile(userId) {
        return instance.get(`/profile/${userId}`)
    },

    getProfileStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
    },

    changeProfileStatus(status) {
        return instance.put(`/profile/status`, {status})
    },

    changeProfile({fullName, aboutMe, lookingForAJob, lookingForAJobDescription}) {
        return instance.put("/profile", {fullName, aboutMe, lookingForAJob, lookingForAJobDescription})
    },

}

export const authApi = {
    auth() {
        return instance.get("/auth/me")
    },

    authWithData({email, password}) {
        return instance.post("/auth/login", {email, password})
    },

    logout() {
        return instance.post(`/auth/logout`)
    }
}