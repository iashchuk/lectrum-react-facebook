// Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import { withProfile } from '../HOC/withProfile';

//Instruments
import Styles from './styles.module.css';

class SecretPage extends Component {
    render() {
        const { secretPicture, isLoggedIn, _onLogout } = this.props;

        if (isLoggedIn) {
            return (
                <div className = { Styles.secret }>
                    <img src = { secretPicture } />
                    <button onClick = { _onLogout }>Выйти</button>
                </div>
            );
        }

        return <Redirect to = '/profile' />;
    }
}

export default withProfile(SecretPage);
