import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    
    return (
        <div className='company-logo'>
            <div className='course-heading'>
                <nav>
                    <img src="https://tse1.mm.bing.net/th?id=OIP.MwXpQyuibMb4iJX0qoDXsQHaHa&pid=Api&P=0&h=360" alt="" />
                    <Link to="/course">COURSES</Link>
                    <Link to="/teacher">TEACHER</Link>
                    <Link to="about">ABOUT US</Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;