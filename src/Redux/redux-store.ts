import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import Thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import AppReducer from "./app-reducer";

let rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: AuthReducer,
        app: AppReducer,
        form: formReducer
    });

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(Thunk)));

// @ts-ignore
window._store = store;

export default store;