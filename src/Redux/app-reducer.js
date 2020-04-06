import {getAuthUserDataThunkCreator} from "./auth-reducer";

const SET_INIT = 'SET_INIT';


let initialState = {
    initialized: false
};

const AppReducer = (state = initialState, action) => {

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

export const setInitAC = () => ({type: SET_INIT});

export const initializeAppThunkCreator = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataThunkCreator());

    Promise.all([promise])
        .then(() => {
        dispatch(setInitAC());
    })
};


export default AppReducer;