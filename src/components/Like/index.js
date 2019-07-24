import React, { useState, useContext } from 'react';
import cx from 'classnames';

//Instruments
import Styles from './styles.module.css';

// Components
import { Context } from '../Context';

const Like = ({ id, likes, likePost }) => {
    const [ showLikers, setShowLikers ] = useState(false);
    const { currentUserFirstName, currentUserLastName } = useContext(Context);

    const getLikedByMe = () => {
        return likes.some(({ firstName, lastName }) => {
            return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`;
        });
    };

    const getLikeStyles = () => {
        const likedByMe = getLikedByMe();

        return cx(Styles.icon, {
            [ Styles.liked ]: likedByMe,
        });
    };

    const getLikersList = () => {
        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }>{`${firstName} ${lastName}`}</li>
        ));

        return likes.length && showLikers ? <ul>{likesJSX}</ul> : null;
    };

    const getLikesDescription = () => {
        const likedByMe = getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and ${likes.length - 1} other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} others`;
        }

        return likes.length;
    };

    const likeStyles = getLikeStyles();
    const likersList = getLikersList();
    const likesDescription = getLikesDescription();

    return (
        <section className = { Styles.like }>
            <span
                className = { likeStyles }
                onClick = { () => likePost(id) }>
                Like
            </span>
            <div>
                {likersList}
                <span
                    onMouseEnter = { () => setShowLikers(true) }
                    onMouseLeave = { () => setShowLikers(false) }>
                    {likesDescription}
                </span>
            </div>
        </section>
    );
};

export default Like;
