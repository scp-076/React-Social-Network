import React from 'react';
import {ReduxLoginForm} from "./LoginForm";
import {connect} from "react-redux";
import {LoginThunkCreator} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {

    const onSubmit = (formData) => {
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

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL
    }
};

let mapDispatchToProps = (dispatch) => {
  return {
      loginThunk:(email, password, rememberMe) => dispatch(LoginThunkCreator(email, password, rememberMe)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);