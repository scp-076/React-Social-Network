import {profileAPI, usersAPI as userAPI} from "../API/api";
import {postsType, profileContactType, profilePhotosType, profileType} from '../types/types';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';

let initialState = {
    posts: [{id: 1, message: 'First message from props', likes: 1},
        {id: 2, message: 'Second message from props', likes: 2}] as Array<postsType>,
    profile: null as profileType | null,
    status: '',
    newPostText: ''
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any):initialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likes: 0
            };
            return {...state, posts: [...state.posts, newPost], newPostText: ''} //reducer должен возвращать новый стейт
        }

        case DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id !== action.postId)}
        }

        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        case SET_STATUS:
            return {...state, status: action.status};

        case SAVE_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos} as profileType};

        default:
            return state;
    }
};

type addPostACType = {
    type: typeof ADD_POST,
    newPostText: string
};
export const addPostAC = (newPostText: string): addPostACType => ({type: ADD_POST, newPostText});
type deletePostACType = {
    type: typeof DELETE_POST,
    postId: number
};
export const deletePostAC = (postId: number): deletePostACType => ({type: DELETE_POST, postId});
type setUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: profileType
};
export const setUserProfileAC = (profile: profileType): setUserProfileACType => ({type: SET_USER_PROFILE, profile});
type setStatusACType = {
    type: typeof SET_STATUS,
    status: string
};
export const setStatusAC = (status: string): setStatusACType => ({type: SET_STATUS, status});
type savePhotoACType = {
    type: typeof SAVE_PHOTO,
    photos: profilePhotosType
};
export const savePhotoAC = (photos: profilePhotosType): savePhotoACType => ({type: SAVE_PHOTO, photos});

export const getUserProfileThunkCreator = (userId: number) => async (dispatch: any) => {
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data))
};

export const getStatusThunkCreator = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data));
};

export const updateStatusThunkCreator = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch (error) {
        alert('error occured');
    }
};

export const savePhotoThunkCreator = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode === 0){
        dispatch(savePhotoAC(response.data.data.photos));
    }
};

export default profileReducer;