import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';
import { socket } from 'socket/init';

// Components
import StatusButton from 'components/StatusButton';
import StatusOnline from 'components/StatusOnline';

export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount() {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render() {
        const { online } = this.state;

        return (
            <section className = { Styles.statusBar }>
                <StatusOnline online = { online } />
                <StatusButton />
            </section>
        );
    }
}
