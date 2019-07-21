import React, { Component } from 'react';

//Instruments
import Styles from './styles.module.css';
import cx from 'classnames';

export default class StatusOnline extends Component {
    render() {
        const { online } = this.props;

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
    }
}
