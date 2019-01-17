// Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';
import avatar from 'theme/assets/lisa';

// Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

const options = {
    avatar,
    currentUserFirstName: 'Lisa',
    currentUserLastName:  'Simpson',
};

export default class Feed extends Component {
    render() {
        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer
                    avatar = { options.avatar }
                    currentUserFirstName = { options.currentUserFirstName }
                />
                <Post { ...options } />
            </section>
        );
    }
}
