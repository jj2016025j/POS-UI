import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav({ user }) { // 假設 user 是從 props 傳入的
    return (
        <React.Fragment>
            <h1>NAV</h1>
            <nav className="navbar navbar-expand-lg navbar-light main-nav">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img src="/image/芳鍋logo1.png" style={{ width: "200px" }} alt="芳鍋logo" /></a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse justify-content-end" id="navbarScroll">
                        <ul className="navbar-nav"
                            style={{ '--bs-scroll-height': '100px', width: '1000px', fontSize: '20px' }}>
                            <li className="nav-item h3">
                                <NavLink className="nav-link active" aria-current="page" to="/"><b>首頁</b></NavLink>
                            </li>
                            <li className="nav-item h3">
                                <NavLink className="nav-link active" aria-current="page" to="/"><b>最新活動</b></NavLink>
                            </li>
                            <li className="nav-item dropdown h3">
                                <a className="nav-link dropdown-toggle active"
                                    href="#"
                                    id="navbarScrollingDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <b>菜單資訊</b>
                                </a>

                                <ul className="dropdown-menu w-50"
                                    aria-labelledby="navbarScrollingDropdown">
                                    <li>
                                        <NavLink className="nav-link active dropdown-item" aria-current="page" to="/menu_base"><b>鍋物湯底</b></NavLink>
                                    </li>
                                    <hr />
                                    <li>
                                        <a className="dropdown-item" href="/menu_meat"><b>單點品項</b></a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item h3">
                                <a className="nav-link active" href="/contactus"><b>聯繫我們</b></a>
                            </li>

                            <li className="nav-item h3">
                                <a className="nav-link active" href="/aboutus"><b>關於芳鍋</b></a>
                            </li>
                            {user ? (
                                <li className="nav-item h3">
                                    <a className="nav-link active" href="/auth/logout"><b>會員登出</b></a>
                                </li>
                            ) : (
                                <li className="nav-item dropdown h3">
                                    <a
                                        className="nav-link dropdown-toggle active"
                                        href="#"
                                        id="navbarScrollingDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <b>會員登入</b>
                                    </a>
                                    <ul
                                        className="dropdown-menu w-50"
                                        aria-labelledby="navbarScrollingDropdown"
                                    >
                                        <li>
                                            <a className="dropdown-item" href="/auth/login"><b>登入</b></a>
                                        </li>
                                        <hr />
                                        <li>
                                            <a className="dropdown-item" href="/auth/signup"><b>註冊</b></a>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Nav;