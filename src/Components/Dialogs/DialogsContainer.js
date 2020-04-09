import {sendMessageAC} from "../../Redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => dispatch(sendMessageAC(newMessageBody))
    }
};

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps))(Dialogs);