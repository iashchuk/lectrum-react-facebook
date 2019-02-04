// Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';
import { api, TOKEN } from 'config/api';

// Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Catcher from 'components/Catcher';

@withProfile
class Feed extends Component {
    state = {
        posts:     [],
        isLoading: false,
    };

    componentDidMount() {
        this._fetchPosts();
    }

    _setLoadingState = (state) => {
        this.setState({
            isLoading: state,
        });
    };

    _fetchPosts = async () => {
        this._setLoadingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isLoading: false,
        });
    };

    _createPost = async (comment) => {
        this._setLoadingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:     [ post, ...posts ],
            isLoading: false,
        }));
    };

    _removePost = (id) => {
        this.setState(({ posts }) => {
            const newPosts = posts.filter((post) => post.id !== id);

            return { posts: newPosts };
        });
    };

    _likePost = async (id) => {
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
    };

    render() {
        const { posts, isLoading } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
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

export default Feed;
