import React from 'react';
import logo from '../public/logo192.png';

function Work({ title, description }) {
    return (
        <React.Fragment>
            <img src={logo} alt="我是作品圖片" />
            <h1>我是作品標題{title}</h1>
            <p>{description}</p>
        </React.Fragment>
    );
}

export default Work;
