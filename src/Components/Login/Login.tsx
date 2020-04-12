import React from 'react';
import {ReduxLoginForm} from "./LoginForm";
import {connect} from "react-redux";
import {LoginThunkCreator} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import { AppStateType } from '../../Redux/redux-store';

type mapStateToPropsType = {
    isAuth: boolean,
    captchaURL: string | null
};
type mapDispatchToPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};
export type LoginFormValuesType = {
    password: string,
    email: string,
    rememberMe: boolean,
    captcha: string
};

const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {

    const onSubmit = (formData: any) => {
        props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };
    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>LOGIN</h1>
        <ReduxLoginForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
    </div>
};

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL
    }
};

let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
  return {
      loginThunk:(email, password, rememberMe, captcha) => dispatch(LoginThunkCreator(email, password, rememberMe, captcha)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);