import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from 'components/HOC/withProfile';

@withProfile
class StatusButton extends Component {
    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <Fragment>
                <Link
                    className = { Styles.statusButton }
                    to = '/profile'>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName}</span>
                </Link>
                <Link
                    className = { Styles.statusButton }
                    to = '/feed'>
                    Feed
                </Link>
            </Fragment>
        );
    }
}

export default StatusButton;
