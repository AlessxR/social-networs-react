import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: '/api/1.0',
    headers: {
        'Content-Type': 'application/json',
        "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7"
    },
});

export const usersApi = {
    getUsers(page = 1, count = 10) {
        return instance.get(`/users?page=${page}&count=${count}`)
            .then(res => res.data);
    },

    follow(userId) {
        return instance.post(`/follow/${userId}`)
            .then(res => res.data);
    },

    unfollow(userId) {
        return instance.delete(`/follow/${userId}`)
            .then(res => res.data);
    }
}

export const profileApi = {

    getProfile(userId) {
        return instance.get(`/profile/${userId}`)
            .then(res => res.data);
    },

    getProfileStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
            .then(res => res.data);
    },

    changeProfileStatus(status) {
        return instance.put(`/profile/status`, {status})
            .then(res => res.data);
    },

    changeProfile({fullName, aboutMe, lookingForAJob, lookingForAJobDescription}) {
        return instance.put("/profile", {fullName, aboutMe, lookingForAJob, lookingForAJobDescription})
            .then(res => res.data);
    },

}

export const authApi = {
    auth() {
        return instance.get("/auth/me")
            .then(res => res.data);
    },

    authWithData({email, password}) {
        return instance.post("/auth/login", {email, password})
            .then(res => res.data);
    },

    logout() {
        return instance.post(`/auth/logout`)
            .then(res => res.data);
    }
}


export const fetchData = async (url, method, rejectWithValue, body = null) => {
    try {

        const options = {
            credentials: "include",
            method,
            headers: {
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7",
                ...(body ? {"Content-Type": "application/json"} : {})
            },
        };

        if (body && method !== "GET") {
            options.body = body;
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            return rejectWithValue(response.statusText);
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue({status: 500, message: error.message});
    }
}