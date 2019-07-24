// Core
import React, { useContext } from 'react';

//Components
import { Context } from '../Context';

// Instruments
import Styles from './styles.module.css';

const Profile = ({ isLoggedIn, onLogin, onLogout }) => {
    const { avatar, currentUserFirstName, currentUserLastName } = useContext(Context);

    return (
        <section className = { Styles.profile }>
            <h1>
                Welcome, {currentUserFirstName} {currentUserLastName}
            </h1>
            <img src = { avatar } />
            {!isLoggedIn ? (
                <>
                    <h2>Для просмотра секретной страницы необходимо нажать кнопку</h2>
                    <button onClick = { onLogin }>Получить доступ</button>
                </>
            ) : (
                <button onClick = { onLogout }>Закрыть доступ к секретной странице</button>
            )}
        </section>
    );
};

export default Profile;
