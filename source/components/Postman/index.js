// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

const Postman = ({ avatar, currentUserFirstName }) => {
    const _animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { x: 500 }, { x: 0 });
    };

    const _animatePostmanEntered = (postman) => {
        fromTo(postman, 1, { x: 0 }, { x: 500 });
    };

    return (
        <Transition
            appear
            in
            timeout = { 5000 }
            onEnter = { _animatePostmanEnter }
            onEntered = { _animatePostmanEntered }>
            <section className = { Styles.postman }>
                <img src = { avatar } />
                <span>Welcome online, {currentUserFirstName}</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
