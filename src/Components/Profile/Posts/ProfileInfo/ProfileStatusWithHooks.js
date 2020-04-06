import React, {useEffect, useState} from 'react';
import classes from '../../Profile.module.scss';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    };

    return (
        <div>
            {!editMode
                ?
                <div className={classes.statusBar}>
                <span onClick={activateEditMode}
                >{props.status || 'Profile status'}</span>
                </div>
                :
                <div className={classes.statusBar}>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        type="text"
                        value={status}
                    />
                </div>
            }


        </div>

    )
};

export default ProfileStatusWithHooks;