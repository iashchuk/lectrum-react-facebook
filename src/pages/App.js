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
import { Context } from '../components/Context';

const options = {
    avatar,
    secretPicture,
    currentUserFirstName: 'Виталий',
    currentUserLastName:  'Ящук',
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
            <Context.Provider value = { options }>
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
                                isLoggedIn = { isLoggedIn }
                                onLogin = { onLogin }
                                onLogout = { onLogout }
                            />
                        ) }
                    />
                    <Route
                        path = '/secret'
                        render = { () => (
                            <SecretPage
                                isLoggedIn = { isLoggedIn }
                                onLogout = { onLogout }
                            />
                        ) }
                    />
                    <Redirect to = '/feed' />
                </Switch>
            </Context.Provider>
        </Catcher>
    );
};
