import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">All Recipes</Link>
            <Link to="/add">Add New Recipe</Link>
        </nav>
    );
}

export default Navbar;