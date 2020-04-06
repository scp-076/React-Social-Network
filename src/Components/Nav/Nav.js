import React from 'react';
import classes from './Nav.module.scss';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    return(
        <div className={classes.nav}>
        <nav>
            <ul>
                <li><NavLink activeClassName={classes.active} to="/profile">Profile</NavLink></li>
                <li><NavLink activeClassName={classes.active} to="/messages">Messages</NavLink></li>
                <li><NavLink activeClassName={classes.active} to="/news">News</NavLink></li>
                <li><NavLink activeClassName={classes.active} to="/music">Music</NavLink></li>
                <li><NavLink activeClassName={classes.active} to="/users">Users</NavLink></li>
                <li className={classes.settingsLink}><NavLink activeClassName={classes.active} to="/settings">Settings</NavLink></li>
            </ul>
        </nav>
        </div>
    )
};

export default Nav;