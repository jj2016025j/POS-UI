import React from 'react';

function Footer() {
    return (
        <React.Fragment>
            <div className="footer container-fluid"
                style={{ position: 'relative', width: '100%', zIndex: -50 }}>
                <img style={{ width: '200px', position: 'absolute', left: '129px', top: '259px' }}
                    src="/image/圖層 0.png"
                    alt="" />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                        position: 'absolute',
                        left: '509px',
                        bottom: '130px',
                    }}
                >
                    <a
                        href="#"
                        style={{
                            writingMode: 'vertical-rl',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                        }}
                    >隱私權政策</a>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                        position: 'absolute',
                        left: '629px',
                        bottom: '153px',
                    }}
                >
                    <a
                        href="#"
                        style={{
                            writingMode: 'vertical-rl',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                        }}
                    >聯絡我們</a>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                        position: 'absolute',
                        left: '749px',
                        bottom: '153px',
                    }}
                >
                    <a
                        href="#"
                        style={{
                            writingMode: 'vertical-rl',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                        }}
                    >最新消息</a>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    position: 'absolute',
                    left: '869px',
                    bottom: '153px',
                }} >
                    <a href="#" style={{
                        writingMode: 'vertical-rl',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                    }} >關於我們</a>
                </div>

                <div id="connect">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            left: '869px',
                            bottom: '153px',
                        }} >
                        <a href="#" style={{ position: 'absolute', right: '231px', bottom: '148px' }}
                        ><img src="/image/instagram.png" style={{ width: '80px' }}
                            alt="Instagram" /></a>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            left: '869px',
                            bottom: '153px',
                        }}>
                        <a href="#" style={{ position: 'absolute', right: '113px', bottom: '148px' }}
                        ><img src="/image/facebook.png" style={{ width: '80px' }}
                            alt="Facebook" /></a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }} id="privacy">
                    <p style={{
                        position: 'absolute', right: '50px', bottom: '10px'
                    }}>芳鍋 版權所有 2024 ©All rights reserved
                    </p>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Footer;
