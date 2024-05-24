import React from 'react';
import "../styles/navbar.css";

const NavBar = () => {
    return (
        <div className='nav'>
            <ul className='nav-list'>
                <li className='active'>us-east</li>
                <li>us-west</li>
                <li>eu-west</li>
                <li>eu-central</li>
                <li>sa-east</li>
                <li>ap-southeast</li>
            </ul>
        </div>
    )
}

export default NavBar
