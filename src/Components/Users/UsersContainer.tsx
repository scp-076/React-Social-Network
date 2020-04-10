import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator, requestUsersThunkCreator,
    setCurrentPageAC,
    toggleFollowingInProgressAC,
    unfollowThunkCreator
} from "../../Redux/users-reducer";
import Users from "./Users"
import Preloader from "../common/Preloader";
import {
    getCurrentPageSelector, getFollowingInProgressSelector,
    getPageSizeSelector, getPreloaderSelector,
    getTotalUsersCountSelector,
    getUsers
} from "../../Redux/users-selectors";
import {userType} from '../../types/types';
import {AppStateType} from '../../Redux/redux-store';

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    preloader: boolean,
    totalUsersCount: number,
    users: Array<userType>,
    followingInProgress: Array<number>
};
type MapDispatchToPropsType = {
    requestUsersThunk: (currentPage: number, pageSize: number) => void,
    setCurrentPage: (pageNumber: number) => void,
    followThunk: (userId: number) => void,
    unfollowThunk: (userId: number) => void
};
type OwnPropsType = {
    pageTitle: string
};
type propsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersContainer extends React.Component<propsType> {

    componentDidMount() {
        this.props.requestUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsersThunk(pageNumber, this.props.pageSize);
        this.props.setCurrentPage(pageNumber);
        // this.props.togglePreloader(true);
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         this.props.togglePreloader(false);
        //         this.props.setUsers(data.items);
        //     });
    };

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.preloader ? <Preloader/> : <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                followThunk={this.props.followThunk}
                unfollowThunk={this.props.unfollowThunk}
            />}
        </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         preloader: state.usersPage.preloader,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// };

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        preloader: getPreloaderSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
};

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        setCurrentPage: (pageNumber: number) => dispatch(setCurrentPageAC(pageNumber)),
        requestUsersThunk: (currentPage: number, pageSize: number) => dispatch(requestUsersThunkCreator(currentPage, pageSize)),
        followThunk: (userId: number) => dispatch(followThunkCreator(userId)),
        unfollowThunk: (userId: number) => dispatch(unfollowThunkCreator(userId))
    }
};

// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
(mapStateToProps, mapDispatchToProps)(UsersContainer);