import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const navigation = () => {
    return (
        <div className="Navigation">
            <ul>
                <li><NavLink to="/" exact>home</NavLink></li>
                <li><NavLink to="/shop">shop</NavLink></li>
                <li><NavLink to="/gallery">gallery</NavLink></li>
                <li><NavLink to="/contacts">contacts</NavLink></li>
            </ul>
        </div>
    );
};

export default navigation;