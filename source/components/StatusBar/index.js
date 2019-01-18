import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

// Components
import StatusButton from 'components/StatusButton';

export default class StatusBar extends Component {
    render() {
        return (
            <section className = { Styles.statusBar }>
                <StatusButton />
            </section>
        );
    }
}
