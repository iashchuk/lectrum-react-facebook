// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

class Spinner extends Component {
    render() {
        const { isLoading } = this.props;

        return createPortal(isLoading ? <div className = { Styles.spinner } /> : null, portal);
    }
}

export default Spinner;
