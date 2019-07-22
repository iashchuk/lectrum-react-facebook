// Core
import { useEffect, useContext } from 'react';

// Components
import { Context } from '../Context';

// Instruments
import { socket } from '../../socket/init';
import { GROUP_ID } from '../../config/api';

export const useSocket = (posts, setPosts) => {
    const context = useContext(Context);

    const userName = `${context.currentUserFirstName} ${context.currentUserLastName}`;

    useEffect(() => {
        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (userName !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                setPosts([ createdPost, ...posts ]);
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (userName !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                setPosts(posts.filter((post) => post.id !== removedPost.id));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (userName !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                setPosts(posts.map((post) => post.id === likedPost.id ? likedPost : post));
            }
        });

        return () => {
            socket.removeListener('create');
            socket.removeListener('remove');
            socket.removeListener('like');
        };
    }, []);
};
