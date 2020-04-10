import React, { ChangeEvent } from 'react';
import classes from '../../Profile.module.scss';

type propsType = {
    status: string,
    updateStatus: (status: string) => void
};
type stateType = {
    editMode: boolean,
    status: string
};

class ProfileStatus extends React.Component<propsType, stateType> {

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

    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        });
    };

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
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