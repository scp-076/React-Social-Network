import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Dialogs.module.scss';

export const Dialog = (props) => {
    let path = '/dialogs/' + props.id;

    return(
        <div className={classes.dialogs__item}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
};