import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export let store = {
    _state: {
        profilePage: {
            posts: [{id: 1, message: 'First message from props', likes: 1},
                {id: 2, message: 'Second message from props', likes: 2}],
            newPostText: 'it-test'
        },

        dialogsPage: {
            messages: [
                {id: 1, text: 'Message 1'},
                {id: 2, text: 'Message 2'},
                {id: 3, text: 'Message 3'},
                {id: 4, text: 'Message 4'},
                {id: 5, text: 'Message 5'}],
            dialogs: [
                {id: 1, name: 'Dialog 1'},
                {id: 2, name: 'Dialog 2'},
                {id: 3, name: 'Dialog 3'},
                {id: 4, name: 'Dialog 4'},
                {id: 5, name: 'Dialog 5'}
            ],
            newMessageBody: ''
        },

        sidebar: {},
    },
    _callSubscriber() {
        console.log('Redux changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer; // observer pattern (addEventListener например)
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    }
};

window.store = store;
