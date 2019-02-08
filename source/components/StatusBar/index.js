import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

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

    _animateStatusbarEnter = (statusBar) => {
        fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
    };

    render() {
        const { online } = this.state;

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusbarEnter }>
                <section className = { Styles.statusBar }>
                    <StatusOnline online = { online } />
                    <StatusButton />
                </section>
            </Transition>
        );
    }
}
