import React from 'react';
import slide1 from '../../image/廣告/未命名-1.png'; // 確保路徑正確
import slide2 from '../../image/廣告/未命名-2.png';
import slide3 from '../../image/廣告/未命名-3.png';

function CarouselSection() {
    return (
        <div id="carouselExampleDark" className="carousel slide carousel-dark carousel-fade" data-bs-ride="carousel" style={{ width: '60%', marginTop: '-100px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"
                aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="2000">
                    <img src={slide1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src={slide2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src={slide3} className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev"
                style={{ left: '-50px' }}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next"
                style={{ right: '-50px' }}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default CarouselSection;
