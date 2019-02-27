// Core
import React, { Component, Fragment } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
class Profile extends Component {
    render() {
        const {
            currentUserFirstName,
            currentUserLastName,
            avatar,
            isLoggedIn,
            _onLogin,
            _onLogout,
        } = this.props;

        return (
            <section className = { Styles.profile }>
                <h1>
                    Welcome, {currentUserFirstName} {currentUserLastName}
                </h1>
                <img src = { avatar } />
                {!isLoggedIn ? (
                    <Fragment>
                        <h2>Для просмотра закрытой страницы необходимо нажать кнопку</h2>
                        <button onClick = { _onLogin }>Получить доступ</button>
                    </Fragment>
                ) : (
                    <button onClick = { _onLogout }>Закрытыть доступ к закрытой странице</button>
                )}
            </section>
        );
    }
}

export default Profile;
