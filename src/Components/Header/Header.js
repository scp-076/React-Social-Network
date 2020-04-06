import React from 'react';
import classes from './Header.module.scss';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return(
        <header className={classes.header}>
            <NavLink to='/profile'><img style={{height: 80, width: 80, padding: 10, marginLeft: 10}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/1024px-LINE_logo.svg.png" alt=''/></NavLink>
            <div className={classes.loginWrapper}>
                {props.isAuth
                    ?
                    <div> {props.login}
                        <button className={classes.logoutButton} onClick={props.logoutThunk}>Logout</button>
                    </div>
                    :
                    <NavLink className={classes.loginButton} to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
};

export default Header;