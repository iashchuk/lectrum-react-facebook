// Core
import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class Post extends Component {
    render() {
        return (
            <section className = { Styles.post }>
                <img src = { this.props.avatar } />
                <a>{`${this.props.currentUserFirstName} ${this.props.currentUserLastName}`}</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy</p>
            </section>
        );
    }
}

export default withCompose(Post);
