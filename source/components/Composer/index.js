import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.m.css';

// Components
import withCompose from 'components/HOC/withCompose';

class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
    }

    state = {
        comment: '',
    };

    _updateComment(event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _submitComment(event) {
        event.preventDefault();
        const { comment } = this.state;

        if (!comment) {
            return null;
        }
        this.props._createPost(comment);

        this.setState({
            comment: '',
        });
    }

    render() {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this._submitComment }>
                    <textarea
                        placeholder = { `What\'s on your mind, ${currentUserFirstName}` }
                        value = { comment }
                        onChange = { this._updateComment }
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
