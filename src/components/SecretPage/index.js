// Core
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import { Context } from '../Context';

//Instruments
import Styles from './styles.module.css';

const SecretPage = ({ isLoggedIn, onLogout }) => {
    const { secretPicture } = useContext(Context);

    if (isLoggedIn) {
        return (
            <div className = { Styles.secret }>
                <img src = { secretPicture } />
                <button onClick = { onLogout }>Выйти</button>
            </div>
        );
    }

    return <Redirect to = '/profile' />;
};

export default SecretPage;
