import React from 'react';

//Instruments
import Styles from './styles.module.css';
import cx from 'classnames';

const StatusOnline = ({ online }) => {
    const statusStyle = cx(Styles.status, {
        [ Styles.online ]:  online,
        [ Styles.offline ]: !online,
    });

    const statusMessage = online ? 'Online' : 'Offline';

    return (
        <div className = { statusStyle }>
            <div>{statusMessage}</div>
            <span />
        </div>
    );
};

export default StatusOnline;
