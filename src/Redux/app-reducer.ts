import {getAuthUserDataThunkCreator} from "./auth-reducer";

const SET_INIT = 'SET_INIT';

export type initialStateType = {
    initialized: boolean
};

let initialState: initialStateType = {
    initialized: false
};

const AppReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case SET_INIT:
            return {
                ...state,   //reducer должен возвращать новый стейт
                initialized: true
            };

        default:
            return state;
    }
};

type setInitACType = {
    type: typeof SET_INIT
};

export const setInitAC = (): setInitACType => ({type: SET_INIT});

export const initializeAppThunkCreator = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunkCreator());

    Promise.all([promise])
        .then(() => {
        dispatch(setInitAC());
    })
};


export default AppReducer;