// Core
import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { TweenMax } from 'gsap';

//Instruments
import Styles from './styles.module.css';
import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../../socket/init';

// Components
import { withProfile } from '../HOC/withProfile';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';
import Catcher from '../Catcher';
import Postman from '../Postman';
import Counter from '../Counter';

class Feed extends Component {
    state = {
        posts:     [],
        isLoading: false,
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();
        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
                }));
            }
        });
    }

    componentWillMount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
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

    _removePost = async (id) => {
        this._setLoadingState(false);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => {
            const newPosts = posts.filter((post) => post.id !== id);

            return { posts: newPosts };
        });
    };

    _likePost = async (id) => {
        this._setLoadingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts:     posts.map((post) => post.id === likedPost.id ? likedPost : post),
            isLoading: false,
        }));
    };

    _animateComposerEnter = (composer) => {
        TweenMax.fromTo(composer, 1, { opacity: 0, rotationX: 50 }, { opacity: 1, rotationX: 0 });
    };

    _animatePostmanEnter = (postman) => {
        TweenMax.fromTo(postman, 1, { x: 500 }, { x: 0 });
    };

    _animatePostmanEntered = (postman) => {
        TweenMax.fromTo(postman, 1, { x: 0 }, { x: 500 });
    };

    render() {
        const { posts, isLoading } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <CSSTransition
                    classNames = {{
                        enter:       Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit:        Styles.postOutStart,
                        exitActive:  Styles.postOutEnd,
                    }}
                    key = { post.id }
                    timeout = {{ enter: 500, exit: 400 }}>
                    <Catcher>
                        <Post
                            { ...post }
                            _likePost = { this._likePost }
                            _removePost = { this._removePost }
                        />
                    </Catcher>
                </CSSTransition>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isLoading = { isLoading } />
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Counter count = { postsJSX.length } />
                <Transition
                    appear
                    in
                    timeout = { 5000 }
                    onEnter = { this._animatePostmanEnter }
                    onEntered = { this._animatePostmanEntered }>
                    <Postman />
                </Transition>
                <TransitionGroup>{postsJSX}</TransitionGroup>
            </section>
        );
    }
}

export default withProfile(Feed);
