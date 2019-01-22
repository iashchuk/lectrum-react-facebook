import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class Composer extends Component {
    render() {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What\'s on your mind, ${currentUserFirstName}` } />
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
