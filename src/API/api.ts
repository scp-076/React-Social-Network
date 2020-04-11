import axios from "axios";


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

    follow: (userId: number) => {
        return axiosInstance.post(`/follow/${userId}`)
            .then(response => response.data)
    },

    unfollow: (userId: number) => {
        return axiosInstance.delete(`/follow/${userId}`)
            .then(response => response.data)
    },

    getProfile: (userId: number) => {
        return  profileAPI.getProfile(userId)
    },
};

export const profileAPI = {

    getProfile: (userId: number) => {
        return  axiosInstance.get('/profile/' + userId)

    },
    getStatus: (userId: number) => {
        return axiosInstance.get('/profile/status/' + userId)
    },
    updateStatus: (status: string) => {
        return axiosInstance.put('/profile/status', {status: status})
    },
    savePhoto: (file: any) => {
        let formData = new FormData();
        formData.append('image', file);
        return axiosInstance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};

export enum resultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
};

type meResponseType = {
  data: {id: number, email: string, login: string},
  resultCode: resultCodeEnum,
  messages: Array<string>
};

type loginResponseType = {
    data: {userId: number},
    resultCode: resultCodeEnum,
    messages: Array<string>
}

export const authAPI = {
    me() {
        return axiosInstance.get<meResponseType>(`/auth/me`) // запрос на аутентификацию
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return axiosInstance.post<loginResponseType>('/auth/login', {email, password, rememberMe, captcha});
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


