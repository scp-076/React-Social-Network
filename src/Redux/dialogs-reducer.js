const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
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
    ]
};

const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {...state, messages: [...state.messages, {id: 6, text: body}]};

        default:
            return state;
    }

};

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;