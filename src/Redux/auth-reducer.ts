import {authAPI, securityAPI} from "../API/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

// export type initialStateType = {
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     preloader: boolean,
//     isAuth: boolean,
//     captchaURL: string | null
// };

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    preloader: false,
    isAuth: false,
    captchaURL: null as string | null // если null, значит не нужна
};

export type initialStateType = typeof initialState;

const AuthReducer = (state = initialState, action: any): initialStateType => {

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

type setAuthUserDataACPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
};

type setAuthUserDataACType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataACPayloadType // или так
};

type getCaptchaURLACType = {
    type: typeof GET_CAPTCHA_URL,
    payload: {captchaURL: string} // или так
};

export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataACType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
});

export const getCaptchaURLAC = (captchaURL: string): getCaptchaURLACType => ({type: GET_CAPTCHA_URL, payload: {captchaURL}});

export const getAuthUserDataThunkCreator = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
};

export const LoginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURLThunkCreator()); // запрос каптчи если с сервера пришло 10
        }
        let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Error;';
        dispatch(stopSubmit('Login', {_error: messages})); // stopSubmit(formname, error: text) для показа ошибки в форме
    }
};

export const getCaptchaURLThunkCreator = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaURL();
    let captchaURL = response.data.url;
    dispatch(getCaptchaURLAC(captchaURL));

};

export const LogoutThunkCreator = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false));
    }
};

export default AuthReducer;