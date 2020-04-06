import * as axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '3a5bb3c5-0448-47b8-b7bb-95d93f711720'
    }

});

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 5) => {
        return axiosInstance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow: (userId) => {
        return axiosInstance.post(`/follow/${userId}`)
            .then(response => response.data)
    },

    unfollow: (userId) => {
        return axiosInstance.delete(`/follow/${userId}`)
            .then(response => response.data)
    },

    getProfile: (userId) => {
        return  profileAPI.getProfile(userId)
    },
};

export const profileAPI = {

    getProfile: (userId) => {
        return  axiosInstance.get('/profile/' + userId)

    },
    getStatus: (userId) => {
        return axiosInstance.get('/profile/status/' + userId)
    },
    updateStatus: (status) => {
        return axiosInstance.put('/profile/status', {status: status})
    },
    savePhoto: (file) => {
        let formData = new FormData();
        formData.append('image', file);
        return axiosInstance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};


export const authAPI = {
    me() {
        return axiosInstance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`) // запрос на аутентификацию
    },
    login(email, password, rememberMe = false, captcha = null) {
        return axiosInstance.post('/auth/login', {email, password, rememberMe, captcha});
    },
    logout() {
        return axiosInstance.delete('/auth/login');
    }
};

export const securityAPI = {
    getCaptchaURL() {
        return axiosInstance.get('/security/get-captcha-url');
    }
};


