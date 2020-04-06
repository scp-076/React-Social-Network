import React from 'react';
import classes from './ProfileInfo.module.scss';
import Preloader from "../../../common/Preloader";
import avatar from '../../../../assets/images/logo-img.jpg';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const photoSelect = (event) => {
        if(event.target.files.length) {
            props.savePhoto(event.target.files[0]);
        }
    };

    return (
        <div>
            <div>
                <img style={{height: 150, width: '100%', margin: '0 auto'}}
                     src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                     alt=""/>
            </div>
            <div className={classes.profileInfo}>
                <img style={{maxWidth: '200px', maxHeight: '200px'}}
                     src={props.profile.photos.large || avatar}/>
                {props.isOwner && <input type={'file'} onChange={photoSelect}/>}

                     <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                <span>{props.profile.aboutMe}</span>
                <span>{props.profile.lookingForAJob}</span>
                <span>{props.profile.lookingForAJobDescription}</span>
                <span>{props.profile.fullName}</span>
            </div>
        </div>
    )
};