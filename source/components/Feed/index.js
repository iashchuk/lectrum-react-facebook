// Core
import React, { Component } from 'react';
import moment from 'moment';

//Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

// Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._setLoadingState = this._setLoadingState.bind(this);
    }

    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'Good evening!', created: 1526325076849 },
        ],
        isLoading: false,
    };

    _setLoadingState(state) {
        this.setState({
            isLoading: state,
        });
    }

    async _createPost(comment) {
        this._setLoadingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:     [ post, ...posts ],
            isLoading: false,
        }));
    }

    render() {
        const { posts, isLoading } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isLoading } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
