import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';


let initialState = {
    id: null,
    email: null,
    login: null,
    preloader: false,
    isAuth: false,
    captchaURL: null // если null, значит не нужна
};

const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,   //reducer должен возвращать новый стейт
                ...action.payload
            };
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

export const setAuthUserDataAC = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});
export const getCaptchaURLAC = (captchaURL) => ({type: GET_CAPTCHA_URL, payload: {captchaURL}});

export const getAuthUserDataThunkCreator = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
};

export const LoginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator());
    } else {
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaURLThunkCreator()); // запрос каптчи если с сервера пришло 10
        }
        let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Error;';
        dispatch(stopSubmit('Login', {_error: messages})); // stopSubmit(formname, error: text) для показа ошибки в форме
    }
};

export const getCaptchaURLThunkCreator = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaURL();
    let captchaURL = response.data.url;
    dispatch(getCaptchaURLAC(captchaURL));

};

export const LogoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false));
    }
};


export default AuthReducer;