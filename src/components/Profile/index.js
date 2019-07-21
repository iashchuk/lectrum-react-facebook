// Core
import React, { Component, Fragment } from 'react';

//Components
import { withProfile } from '../HOC/withProfile';

// Instruments
import Styles from './styles.module.css';

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
                        <h2>Для просмотра секретной страницы необходимо нажать кнопку</h2>
                        <button onClick = { _onLogin }>Получить доступ</button>
                    </Fragment>
                ) : (
                    <button onClick = { _onLogout }>Закрыть доступ к секретной странице</button>
                )}
            </section>
        );
    }
}

export default withProfile(Profile);
