import classes from "./Profile.module.scss";
import {ProfileInfo} from "./Posts/ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import React from "react";

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                         isOwner={props.isOwner} savePhoto={props.savePhoto}/>
            <PostsContainer/>
        </div>
    )
};

export default Profile;
