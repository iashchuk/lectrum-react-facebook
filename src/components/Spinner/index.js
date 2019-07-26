// Core
import React from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.module.css';

const portal = document.getElementById('spinner');

const Spinner = ({ isLoading }) => {
    return createPortal(isLoading ? <div className = { Styles.spinner } /> : null, portal);
};

export default Spinner;
