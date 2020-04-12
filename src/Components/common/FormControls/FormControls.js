import React from 'react';
import classes from "./formsControls.module.scss";

export const Element = Element => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={ classes.formControl + " " + (hasError ? classes.error : "") }>
            <div>
            <Element {...input} {...props} />
            </div>
            <div>
            { hasError && <span> { meta.error } </span> }
            </div>
        </div>
    );
};