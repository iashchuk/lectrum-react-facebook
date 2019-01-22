import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class StatusButton extends Component {
    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <button className = { Styles.statusButton }>
                <img src = { avatar } />
                <span>{currentUserFirstName}</span>
                &nbsp;
                <span>{currentUserLastName}</span>
            </button>
        );
    }
}

export default withCompose(StatusButton);
