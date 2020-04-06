import {profileAPI, usersAPI as userAPI} from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';

let initialState = {
    posts: [{id: 1, message: 'First message from props', likes: 1},
        {id: 2, message: 'Second message from props', likes: 2}],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {

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
            return {...state, profile: {...state.profile, photos: action.photos}};

        default:
            return state;
    }
};

export const addPostAC = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePostAC = (postId) => ({type: DELETE_POST, postId});
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatusAC = (status) => ({type: SET_STATUS, status});
export const savePhotoAC = (photos) => ({type: SAVE_PHOTO, photos});

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data))
};

export const getStatusThunkCreator = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data));
};

export const updateStatusThunkCreator = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch (error) {
        alert('error occured');
    }
};

export const savePhotoThunkCreator = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode === 0){
        dispatch(savePhotoAC(response.data.data.photos));
    }
};

export default profileReducer;