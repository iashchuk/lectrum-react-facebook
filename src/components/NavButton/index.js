import React from 'react';

//Instruments
import Styles from './styles.module.css';

const NavButton = ({ label }) => {
    return <button className = { Styles.navButton }>{label}</button>;
};

export default NavButton;
