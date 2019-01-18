import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class StatusButton extends Component {
    render() {
        return (
            <button className = { Styles.statusButton }>
                <img src = { this.props.avatar } />
                <span>{this.props.currentUserFirstName}</span>
                &nbsp;
                <span>{this.props.currentUserLastName}</span>
            </button>
        );
    }
}

export default withCompose(StatusButton);
