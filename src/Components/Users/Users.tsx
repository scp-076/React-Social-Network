import React from 'react';
import classes from "./users.module.scss";
import avatarImg from "../../assets/images/logo-img.jpg";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator";
import {userType} from '../../types/types';

type propsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (page: number) => void,
    users: Array<userType>,
    followingInProgress: Array<number>,
    followThunk: any,
    unfollowThunk: any
};

const Users: React.FC<propsType> = (props) => {
    return <div>

        <Paginator
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize}
            portionSize={10}
        />
        {
            props.users.map(user => <div className={classes.usersWrap} key={user.id}>
                <div>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={classes.photo}
                                 src={user.photos.small != null ? user.photos.small : avatarImg}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                      className={classes.follow} onClick={() => {
                                props.unfollowThunk(user.id);

                            }}>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                      className={classes.follow} onClick={() => {
                                props.followThunk(user.id);
                            }}>Follow</button>}
                    </div>
                </div>
                <div className={classes.infoWrapper}>
                    <span className={classes.userName}>{user.name}</span>
                    <span>{user.status}</span>
                    <span>{'user.location.country'}</span>
                    <span>{'user.location.city'}</span>
                </div>

            </div>)
        }
    </div>

};


export default Users;