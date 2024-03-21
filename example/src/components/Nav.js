import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    const [isSticky, setIsSticky] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (!navbar) return;
            setIsSticky(window.pageYOffset > navbar.offsetTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header sticky-top bg-white bg-opacity-50 ${isSticky ? '' : ''}`} id="navbar">
            <nav className="navbar navbar-expand-sm open-sans bg-opacity-50">
                <div className="container-fluid mr-5 ml-5">
                    <a className="navbar-brand">
                        <NavLink className="nav-link" to="/">
                            <h1 className="note-sans-black text-center">艾格魯的店</h1>
                        </NavLink>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/store">Store</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">TOOL</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="./gpt.html">GPT</a></li>
                                    <li><a className="dropdown-item" href="#">API整合(尚未開放)</a></li>
                                    <li><a className="dropdown-item" href="#">圖像辨識(尚未開放)</a></li>
                                    <li><a className="dropdown-item" href="#">討論空間(尚未開放)</a></li>
                                    <li><a className="dropdown-item" href="#">其他開發中頁面</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
