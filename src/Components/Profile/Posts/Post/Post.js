import React from 'react';
import classes from './Post.module.scss';

const Post = (props) => {
    return (
        <div className={classes.post}>
            <div className={classes.postWrap}>
                <img className={classes.postImg}
                     src="https://i.pinimg.com/originals/9a/da/3b/9ada3bc305a1f45eab527f60da172d53.png" alt="#"/>
                <span className={classes.postSpan}>{props.message}</span>
            </div>
            <div className={classes.LikesSpan}>
                <span>Likes: {props.likes}</span>
            </div>
        </div>
    )
};

export default Post;