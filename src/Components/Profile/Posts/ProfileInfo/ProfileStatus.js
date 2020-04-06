import React from 'react';
import classes from '../../Profile.module.scss';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    };

    render() {
        return (
            <div>
                {
                    !this.state.editMode
                        ?
                        <div className={classes.statusBar}>
                            <span onClick={this.activateEditMode}>{this.props.status || 'Profile status'}</span>
                        </div>
                        :
                        <div className={classes.statusBar}>
                            <input onChange={this.onStatusChange}
                                   autoFocus={true}
                                   onBlur={this.deactivateEditMode}
                                   type="text"
                                   value={this.state.status}/>
                        </div>
                }

            </div>

        )
    }
}

export default ProfileStatus;