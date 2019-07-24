// Core
import React, { useContext } from 'react';

// Components
import { Context } from '../Context';

//Instruments
import Styles from './styles.module.css';

const Postman = () => {
    const { avatar, currentUserFirstName } = useContext(Context);

    return (
        <section className = { Styles.postman }>
            <img src = { avatar } />
            <span>Welcome online, {currentUserFirstName}</span>
        </section>
    );
};

export default Postman;
