import React from 'react';
import sectionImg from '../image/首頁大圖1.jpg'; // 確保路徑正確

function Card() {
    return (
        <div className="sectionImg">
            <img src={sectionImg} className="img2" alt="" />
        </div>
    );
}

export default Card;
