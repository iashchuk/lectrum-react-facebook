// Core
import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//Instruments
import avatar from '../theme/assets/lisa.png';
import secretPicture from '../theme/assets/dima.png';

// Components
import Feed from '../components/Feed';
import Profile from '../components/Profile';
import Catcher from '../components/Catcher';
import StatusBar from '../components/StatusBar';
import SecretPage from '../components/SecretPage';
import { Provider } from '../components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Виталий',
    currentUserLastName:  'Ящук',
    secretPicture,
};

export const App = () => {
    const [ isLoggedIn, setLoggedIn ] = useState(localStorage.getItem('user') || false);

    const onLogin = () => {
        setLoggedIn(true);
        localStorage.setItem('user', true);
    };

    const onLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('user');
    };

    return (
        <Catcher>
            <Provider value = { options }>
                <StatusBar />
                <Switch>
                    <Route
                        component = { Feed }
                        path = '/feed'
                    />
                    <Route
                        path = '/profile'
                        render = { () => (
                            <Profile
                                _onLogin = { onLogin }
                                _onLogout = { onLogout }
                                isLoggedIn = { isLoggedIn }
                            />
                        ) }
                    />
                    <Route
                        path = '/secret'
                        render = { () => (
                            <SecretPage
                                _onLogout = { onLogout }
                                isLoggedIn = { isLoggedIn }
                            />
                        ) }
                    />
                    <Redirect to = '/feed' />
                </Switch>
            </Provider>
        </Catcher>
    );
};
