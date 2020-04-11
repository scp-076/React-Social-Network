import {usersAPI as userAPI, usersAPI} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";
import { profilePhotosType, userType } from "../types/types";
import { AppStateType } from "./redux-store";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<userType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    preloader: false as boolean,
    followingInProgress: [] as Array<number> // array of users ids
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: actionsType): initialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };

        case SET_USERS:
            return {...state, users: action.users};

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};

        case TOGGLE_PRELOADER:
            return {...state, preloader: action.preloader};

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.preloader
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };

        default:
            return state;
    }
};

type actionsType = followACType | unfollowACType | setUsersACType | setCurrentPageACType | setTotalUsersCountACType | togglePreloaderACType |
    togglePreloaderACType | toggleFollowingInProgressACType;

type followACType = {
    type: typeof FOLLOW,
    userId: number
};
export const followAC = (userId: number): followACType => ({type: FOLLOW, userId});
type unfollowACType = {
    type: typeof UNFOLLOW,
    userId: number
};
export const unFollowAC = (userId: number): unfollowACType => ({type: UNFOLLOW, userId});
type setUsersACType = {
    type: typeof SET_USERS,
    users: Array<userType>
};
export const setUsersAC = (users: Array<userType>): setUsersACType => ({type: SET_USERS, users});
type setCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
};
export const setCurrentPageAC = (currentPage: number): setCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
type setTotalUsersCountACType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
};
export const setTotalUsersCountAC = (totalCount: number): setTotalUsersCountACType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalCount});
type togglePreloaderACType = {
    type: typeof TOGGLE_PRELOADER,
    preloader: boolean
};
export const togglePreloaderAC = (preloader: boolean): togglePreloaderACType => ({type: TOGGLE_PRELOADER, preloader});
type toggleFollowingInProgressACType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    preloader: boolean,
    userId: number
};
export const toggleFollowingInProgressAC = (preloader: boolean, userId: number): toggleFollowingInProgressACType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    preloader,
    userId
});

type getStateType = () => AppStateType;
type dispatchType = Dispatch<actionsType>; //либо так, либо через ThunkAction
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, actionsType>;

export const requestUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(togglePreloaderAC(true));
        let data = await usersAPI.getUsers(page, pageSize); // ajax вынесен в DAL (data access layer) - api.js
        dispatch(togglePreloaderAC(false));
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
    };
};

const _followUnfollowFlow = async (dispatch: dispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => followACType | unfollowACType) => {
    dispatch(toggleFollowingInProgressAC(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    };
    dispatch(toggleFollowingInProgressAC(false, userId));
};

export const followThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followAC);
    };
};

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unFollowAC)
    }
};


export default usersReducer;