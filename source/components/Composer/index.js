import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class Composer extends Component {
    render() {
        return (
            <section className = { Styles.composer }>
                <img src = { this.props.avatar } />
                <form>
                    <textarea
                        placeholder = { `What\'s on your mind, ${this.props.currentUserFirstName}` }
                    />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}

export default withCompose(Composer);
