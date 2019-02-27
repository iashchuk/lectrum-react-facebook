// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'react-router-dom';

//Instruments
import avatar from 'theme/assets/lisa';
import secretPicture from 'theme/assets/dima';

// Components
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import SecretPage from 'components/SecretPage';
import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Виталий',
    currentUserLastName:  'Ящук',
    secretPicture,
};

@hot(module)
export default class App extends Component {
    state = {
        isLoggedIn: localStorage.getItem('user') || false,
    };

    _onLogin = () => {
        this.setState({
            isLoggedIn: true,
        });
        localStorage.setItem('user', true);
    };

    _onLogout = () => {
        this.setState({
            isLoggedIn: false,
        });
        localStorage.removeItem('user');
    };

    render() {
        const { isLoggedIn } = this.state;

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
                                    _onLogin = { this.onLogin }
                                    _onLogout = { this.onLogout }
                                    isLoggedIn = { isLoggedIn }
                                />
                            ) }
                        />
                        <Route
                            path = '/secret'
                            render = { () => (
                                <SecretPage
                                    _onLogout = { this.onLogout }
                                    isLoggedIn = { isLoggedIn }
                                />
                            ) }
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
