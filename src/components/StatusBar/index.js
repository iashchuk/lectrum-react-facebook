import React, { useState, useEffect } from 'react';
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

const StatusBar = () => {
    const [ isOnline, setIsOnline ] = useState(false);

    useEffect(() => {
        socket.on('connect', () => setIsOnline(true));
        socket.on('disconnect', () => setIsOnline(false));

        return () => {
            socket.removeListener('connect');
            socket.removeListener('disconnect');
        };
    }, []);

    const animateStatusbarEnter = (statusBar) => {
        TweenMax.fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
    };

    return (
        <Transition
            appear
            in
            timeout = { 1000 }
            onEnter = { animateStatusbarEnter }>
            <section className = { Styles.statusBar }>
                <StatusOnline online = { isOnline } />
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
};

export default StatusBar;
