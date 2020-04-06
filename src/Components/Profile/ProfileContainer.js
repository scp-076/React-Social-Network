import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    savePhotoThunkCreator,
    updateStatusThunkCreator
} from "../../Redux/profile-reducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

     refreshProfile() {
         let userId = this.props.match.params.userId;
         if(!userId) {
             userId = this.props.authorizedUserId;
             if(!userId) {
                 this.props.history.push('/login'); // ???????? хрен знает вообще что это
             }
         }
         this.props.getUserProfileThunk(userId);
         this.props.getStatusThunk(userId);
     }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
         if(this.props.match.params.userId !== prevProps.match.params.userId){
             this.refreshProfile();
         }
    }

    render(){
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusThunk}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhotoThunk}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getUserProfileThunk: (profile) => dispatch(getUserProfileThunkCreator(profile)),
        getStatusThunk: (userId) => dispatch(getStatusThunkCreator(userId)),
        updateStatusThunk: (status) => dispatch(updateStatusThunkCreator(status)),
        savePhotoThunk: (photos) => dispatch(savePhotoThunkCreator(photos))
    }
};

export default compose(
    WithAuthRedirect,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer);

// withRouter - hoc, создающий контейнер, который получает данные из URL с возможностью их последующего использования
// например, получить userId из URL для вывода профиля нужного пользователя (см. ComponentDidMount)
