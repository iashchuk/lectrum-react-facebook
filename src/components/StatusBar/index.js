import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap';
import { NavLink } from 'react-router-dom';

//Instruments
import Styles from './styles.module.css';
import { socket } from '../../socket/init';

// Components
import StatusButton from '../StatusButton';
import NavButton from '../NavButton';
import StatusOnline from '../StatusOnline';

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
        TweenMax.fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
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
                    <NavLink
                        activeClassName = { Styles.statusLink }
                        to = '/profile'>
                        <StatusButton />
                    </NavLink>
                    <NavLink
                        activeClassName = { Styles.statusLink }
                        to = '/feed'>
                        <NavButton label = 'Feed' />
                    </NavLink>
                    <NavLink
                        activeClassName = { Styles.statusLink }
                        to = '/secret'>
                        <NavButton label = 'Secret page' />
                    </NavLink>
                </section>
            </Transition>
        );
    }
}
