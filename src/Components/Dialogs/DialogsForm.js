import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Element} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";

const Textarea = Element('textarea');

const maxLength20 = maxLengthCreator(20);

const DialogsForm = (props) => {

    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field validate={[required, maxLength20]} component={Textarea} name={'newMessageBody'} placeholder={'Enter your message'} style={{
                        resize: 'none',
                        width: '350px',
                        height: '70px',
                        borderRadius: '5px'
                    }}/>

                </div>
                <div>
                    <button style={{
                        width: '100px',
                        height: '30px',
                        borderRadius: '20px',
                        backgroundColor: '#5B86E5',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        outline: 'none'
                    }}>Send
                    </button>
                </div>
            </form>
    )
};

export const ReduxDialogsForm = reduxForm({form: 'DialogsForm'})(DialogsForm);