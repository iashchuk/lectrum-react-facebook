// Core
import React from 'react';

//Instruments
import Styles from './styles.module.css';
import { withProfile } from '../HOC/withProfile';

const Postman = ({ avatar, currentUserFirstName }) => {
    return (
        <section className = { Styles.postman }>
            <img src = { avatar } />
            <span>Welcome online, {currentUserFirstName}</span>
        </section>
    );
};

export default withProfile(Postman);
