import React from 'react';
import classes from "./Posts.module.scss";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Element} from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(10);
const Textarea = Element('textarea');

const PostForm = (props) => {

    return (
        <form className={classes.posts} onSubmit={props.handleSubmit}>

            <div className={classes.postAddWrap}>
                <Field name={'newPostText'} className={classes.textarea} component={Textarea}
                       validate={[required, maxLength10]} placeholder={'Post message'}/>

                <button className={classes.AddPostButton}>Add post</button>

                <hr style={{backgroundColor: '#fff', width: 100 + '%', height: 3 + 'px'}}/>
            </div>

        </form>
    )
};

export const ReduxPostForm = reduxForm({form: 'postForm'})(PostForm);