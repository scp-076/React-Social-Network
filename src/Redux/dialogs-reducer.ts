const SEND_MESSAGE = 'SEND_MESSAGE';

type messagesType = {
    id: number,
    text: string
};

type dialogsType = {
    id: number,
    name: string
}

let initialState = {
    messages: [
        {id: 1, text: 'Message 1'},
        {id: 2, text: 'Message 2'},
        {id: 3, text: 'Message 3'},
        {id: 4, text: 'Message 4'},
        {id: 5, text: 'Message 5'}] as Array<messagesType>,
    dialogs: [
        {id: 1, name: 'Dialog 1'},
        {id: 2, name: 'Dialog 2'},
        {id: 3, name: 'Dialog 3'},
        {id: 4, name: 'Dialog 4'},
        {id: 5, name: 'Dialog 5'}] as Array<dialogsType>
};

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {...state, messages: [...state.messages, {id: 6, text: body}]};

        default:
            return state;
    }
};

type sendMessageACType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
};

export const sendMessageAC = (newMessageBody: string): sendMessageACType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;