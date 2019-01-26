// Core
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class Post extends Component {
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
    };

    render() {
        const { avatar, currentUserFirstName, currentUserLastName, comment, created } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}

export default withCompose(Post);
