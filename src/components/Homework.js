import React from 'react';
import { Link } from 'react-router-dom';
import '../components/assets/Homework.scss';


export default function Homework() {
    return (
        <div className="homework-container">
            <h2>Homework Links</h2>
            <ul className="homework-list">
                <li>
                    <Link to="/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/sampleapi">Sample API</Link>
                </li>
                <li>
                    <Link to="/stringtonumber">String To Number</Link>
                </li>
                <li>
                    <Link to="/blog">Blog Page</Link>
                </li>
                <li>
                    <Link to='/' className="home-link">Go Home</Link>
                </li>
            </ul>
        </div>
    )
}