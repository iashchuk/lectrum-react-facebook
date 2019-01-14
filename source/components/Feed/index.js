// Core
import React, { Component, Fragment } from 'react';

// Components
import Composer from 'components/Composer';
import Post from 'components/Post';

export default class Feed extends Component {
    render() {
        return (
            <Fragment>
                <Composer />
                <Post />
            </Fragment>
        );
    }
}
