import React, { Component } from 'react';

//Instruments
import Styles from './styles.module.css';

// Components
import { withProfile } from '../HOC/withProfile';

class NavButton extends Component {
    render() {
        const { label } = this.props;

        return <button className = { Styles.navButton }>{label}</button>;
    }
}

export default withProfile(NavButton);
