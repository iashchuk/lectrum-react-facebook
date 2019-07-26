// Core
import React, { useState, useEffect } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { TweenMax } from 'gsap';

//Instruments
import Styles from './styles.module.css';
import { request } from '../../config/api';
import { useSocket } from './useSocket';

// Components
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';
import Catcher from '../Catcher';
import Postman from '../Postman';
import Counter from '../Counter';

export const Feed = () => {
    const [ posts, setPosts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useSocket(posts, setPosts);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            setPosts(await request.get());
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    const createPost = async (comment) => {
        setIsLoading(true);
        const post = await request.post(comment);
        setPosts([ post, ...posts ]);
        setIsLoading(false);
    };

    const removePost = async (postId) => {
        setIsLoading(true);
        await request.delete(postId);
        setPosts(posts.filter((post) => post.id !== postId));
        setIsLoading(false);
    };

    const likePost = async (postId) => {
        setIsLoading(true);
        const likedPost = await request.put(postId);
        setPosts(posts.map((post) => post.id === likedPost.id ? likedPost : post));
        setIsLoading(false);
    };

    const animateComposerEnter = (composer) => {
        TweenMax.fromTo(composer, 1, { opacity: 0, rotationX: 50 }, { opacity: 1, rotationX: 0 });
    };

    const animatePostmanEnter = (postman) => {
        TweenMax.fromTo(postman, 1, { x: 500 }, { x: 0 });
    };

    const animatePostmanEntered = (postman) => {
        TweenMax.fromTo(postman, 1, { x: 0 }, { x: 500 });
    };

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
                        likePost = { likePost }
                        removePost = { removePost }
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
                onEnter = { animateComposerEnter }>
                <Composer createPost = { createPost } />
            </Transition>
            <Counter count = { postsJSX.length } />
            <Transition
                appear
                in
                timeout = { 5000 }
                onEnter = { animatePostmanEnter }
                onEntered = { animatePostmanEntered }>
                <Postman />
            </Transition>
            <TransitionGroup>{postsJSX}</TransitionGroup>
        </section>
    );
};

export default Feed;
