// Core
import React, { useContext } from 'react';
import moment from 'moment';

// Instruments
import Styles from './styles.module.css';

// Components
import { Context } from '../Context';
import Like from '../Like';

const Post = ({ firstName, lastName, comment, created, id, likes, likePost, removePost }) => {
    const { avatar, currentUserFirstName, currentUserLastName } = useContext(Context);

    const getCross = () => {
        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? (
            <span
                className = { Styles.cross }
                onClick = { () => removePost(id) }
            />
        ) : null;
    };

    const cross = getCross();

    return (
        <section className = { Styles.post }>
            {cross}
            <img src = { avatar } />
            <a>{`${firstName} ${lastName}`}</a>
            <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
            <p>{comment}</p>
            <Like
                id = { id }
                likePost = { likePost }
                likes = { likes }
            />
        </section>
    );
};

export default Post;
