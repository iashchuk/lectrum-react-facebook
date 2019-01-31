// Core
import React, { Component } from 'react';
import moment from 'moment';

//Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

// Components
import withCompose from 'components/HOC/withCompose';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._removePost = this._removePost.bind(this);
        this._setLoadingState = this._setLoadingState.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849, likes: [] },
            { id: '456', comment: 'Good evening!', created: 1526325076849, likes: [] },
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
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:     [ post, ...posts ],
            isLoading: false,
        }));
    }

    _removePost = (id) => {
        this.setState(({ posts }) => {
            const index = posts.findIndex((post) => post.id === id);

            return { posts: [ ...posts.slice(0, index), ...posts.slice(index + 1) ] };
        });
    };

    async _likePost(id) {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setLoadingState(true);
        await delay(1200);

        const posts = [ ...this.state.posts ];

        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:     newPosts,
            isLoading: false,
        });
    }

    render() {
        const { posts, isLoading } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isLoading = { isLoading } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}

export default withCompose(Feed);
