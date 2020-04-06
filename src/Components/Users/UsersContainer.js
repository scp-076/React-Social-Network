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
    getUsersSelector
} from "../../Redux/users-selectors";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
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
            {this.props.preloader ? <Preloader/> :  <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
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

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        preloader: getPreloaderSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (pageNumber) => dispatch(setCurrentPageAC(pageNumber)),
        toggleFollowingInProgress: (preloader, userId) => dispatch(toggleFollowingInProgressAC(preloader, userId)),
        requestUsersThunk: (currentPage, pageSize) => dispatch(requestUsersThunkCreator(currentPage, pageSize)),
        followThunk: (userId) => dispatch(followThunkCreator(userId)),
        unfollowThunk: (userId) => dispatch(unfollowThunkCreator(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);