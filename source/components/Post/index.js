// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';
import Like from 'components/Like';

class Post extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        comment:   string.isRequired,
        created:   number.isRequired,
        id:        string.isRequired,
        likes:     array.isRequired,
    };

    render() {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            comment,
            created,
            id,
            likes,
            _likePost,
            _removePost,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <span
                    className = { Styles.cross }
                    onClick = { () => _removePost(id) }
                />
                <img src = { avatar } />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}

export default withCompose(Post);
