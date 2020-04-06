import React from 'react';
import classes from './Dialogs.module.scss';
import {Dialog} from "./Dialog";
import {Message} from "./Message";
import {ReduxDialogsForm} from "./DialogsForm";

export const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs
        .map((dialog, index) => <Dialog key={index} id={dialog.id} name={dialog.name}/>);


    let messagesElements = state.messages
        .map((message, index) => <Message key={index} text={message.text}/>);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    };

    return (

        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>{dialogsElements}</div>

            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <ReduxDialogsForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
};