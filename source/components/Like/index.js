import React, { Component } from 'react';
import { func, string, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

//Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ).isRequired,
    };

    constructor() {
        super();
        this._getLikedByMe = this._getLikedByMe.bind(this);
        this._getLikeStyles = this._getLikeStyles.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    _likePost() {
        const { _likePost, id } = this.props;
        _likePost(id);
    }

    _getLikedByMe() {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`;
        });
    }

    _getLikeStyles() {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [ Styles.liked ]: likedByMe,
        });
    }

    render() {
        console.log(this.props);
        const likeStyles = this._getLikeStyles();

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this._likePost }>
                    Like
                </span>
            </section>
        );
    }
}

export default withCompose(Like);
