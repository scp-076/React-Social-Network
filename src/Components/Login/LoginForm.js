import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Element} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validator";
import classes from '../common/FormControls/formsControls.module.scss';

const Input = Element('input');

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {/*handleSubmit вызывается из Redux-form (его мы не определяли вручную)*/}
            <div>
                <Field placeholder={'Email'} name={'email'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} type={'password'}
                       validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> Remember me
            </div>
            {props.captchaURL && <img src={props.captchaURL}/>}
            {props.captchaURL &&
            <Field component={'input'} name={'captcha'} type={'text'} placeholder='enter symbols from picture'
                   validate={[required]}/>}
            {props.error && <div className={classes.formError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

export const ReduxLoginForm = reduxForm({form: 'Login'})(LoginForm);