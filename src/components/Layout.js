import React from "react";
import { Link, Outlet } from "react-router-dom";
import '../components/assets/Layout.scss';
import logo from '../components/images/logo.svg';


export default function Layout() {
    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand logo"><img src={logo} alt="Logo" /></Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/movies" className="nav-link">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sampleapi" className="nav-link">Sample API</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stringtonumber" className="nav-link">String To Number</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    )
}