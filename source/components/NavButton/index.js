import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from 'components/HOC/withProfile';

@withProfile
class NavButton extends Component {
    render() {
        const { label } = this.props;

        return <button className = { Styles.navButton }>{label}</button>;
    }
}

export default NavButton;
