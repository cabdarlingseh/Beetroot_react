import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import '../components/assets/Layout.scss';
import logo from '../components/images/logo.svg';



export default function Layout() {

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            document.body.classList.add('full_height');
        }
        else {
            document.body.classList.remove('full_height');
        }

        return () => {
            document.body.classList.remove('full_height');
        }
    }, [location.pathname]);

    return (
        <div className="main_container">
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand logo"><img src={logo} alt="Logo" /></Link>
                    <h2 className="homeworks">My HomeWorks</h2>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/movies" className="nav-link">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sampleapi" className="nav-link">Sample API</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stringtonumber" className="nav-link">String To Number</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link">Blog Page</Link>
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