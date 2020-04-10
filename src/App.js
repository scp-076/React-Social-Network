import React from 'react';
import classes from './App.module.scss';
import Nav from "./Components/Nav/Nav";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {initializeAppThunkCreator} from "./Redux/app-reducer";
import {compose} from "redux";
import Preloader from "./Components/common/Preloader";

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));


class App extends React.Component {

    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert('some error occured');
        console.error(promiseRejectionEvent); // тут не все, надо бы прогуглить про ошибки
    };

    componentDidMount() {
        this.props.initializeAppThunk();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <BrowserRouter>
                    <div className={classes.appWrapper}>

                        <HeaderContainer/>
                        <Nav/>
                        <div className={classes.appWrapperContent}>
                            <Switch>
                                <Route exact path={'/'} render={() => <Redirect to={'/profile'}/>}/>
                                <Route path='/profile/:userId?' render={() => {
                                    return <React.Suspense fallback={<div>Loading...</div>}>
                                        <ProfileContainer/>
                                    </React.Suspense>
                                }}/>
                                <Route exact path='/messages' render={() => {
                                    return <React.Suspense fallback={<div>Loading...</div>}>
                                        <DialogsContainer/>
                                    </React.Suspense>
                                }}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='/users' render={() => <UsersContainer pageTitle={'users page'}/>}/>
                                <Route exact path='/login' render={() => <Login/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                            {/*switch перебирает роуты, при нахождении нужного он возвращает его и остальные не просматриваются*/}
                        </div>
                    </div>
                </BrowserRouter>
            );
        }
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        initializeAppThunk: () => dispatch(initializeAppThunkCreator())
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(App);
