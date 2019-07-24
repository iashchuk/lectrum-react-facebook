import React, { useContext } from 'react';

//Instruments
import Styles from './styles.module.css';

// Components
import { Context } from '../Context';

const StatusButton = () => {
    const context = useContext(Context);
    const { avatar, currentUserFirstName, currentUserLastName } = context;

    return (
        <button className = { Styles.statusButton }>
            <img src = { avatar } />
            <span>{currentUserFirstName}</span>
            &nbsp;
            <span>{currentUserLastName}</span>
        </button>
    );
};

export default StatusButton;
