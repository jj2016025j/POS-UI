import React from 'react';
import activityImage from './image/廣告/活動3.png'; // 確保路徑正確

function NewInformationSection() {
    return (
        <div className="part3-2 container mt-5 d-flex justify-content-center" style={{ width: '100%' }}>
            <div className="row">
                <div className="col-sm-7 mt-5 infoImg">
                    <img src={activityImage} alt="" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-sm-5 ps-5 infoContent" style={{ paddingTop: '150px' }}>
                    <p>2024.02.06 - 2024.07.31</p>
                    <h1><b>芳鍋會員優惠 登入換好禮</b></h1>
                    <h4><b>芳鍋感謝回饋　登入會員免費招待您!</b></h4>
                    {/* 略 */}
                </div>
                <div style={{ marginTop: '50px' }} className="container-sm d-flex justify-content-center infoButton">
                    <a href="./infomationPage" className="btn btn-outline-primary text-primary link-light" id="infoBtn" style={{ width: '300px' }}><b>詳細資訊</b></a>
                </div>
            </div>
        </div>
    );
}

export default NewInformationSection;
