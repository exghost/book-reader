import React from 'react';
import PropTypes from 'prop-types';

import 'components/NavBar/style.css'

const NavBar = ({ children }) => {

    return (
        <nav className="navbar navbar-dark bg-dark">
            <ul className="navbar-nav mr-auto">
                {children && children.map((child, index) => (
                    <li className="nav-item" key={index}>{child}</li>
                ))}
            </ul>
        </nav>
    )
};

NavBar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default NavBar;