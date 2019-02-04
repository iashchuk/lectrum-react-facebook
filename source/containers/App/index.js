// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Instruments
import avatar from 'theme/assets/lisa';

// Components
import Feed from 'components/Feed';
import Catcher from 'components/Catcher';
import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Виталий',
    currentUserLastName:  'Ящук',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
