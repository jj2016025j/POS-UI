import React from 'react';
import cardImg1 from '../image/info1.jpg'; // 確保路徑正確
import cardImg2 from '../image/info2.jpeg';
import cardImg3 from '../image/info4.jpg';
import Card from './Card';

function FeatureSection() {
    return (
        <React.Fragment>
            <div className="part2-1 text-center" style={{ marginTop: '70px', height: '100px', backgroundColor: 'gray', fontSize: '30px' }}>
                <p style={{ color: 'rgb(89, 83, 83)' }}>- FEATURE -</p>
                <p><b>幸福的滋味重新定義</b></p>
            </div>
            <div className="part2-2 row px-4 " style={{ marginTop: '70px' }}>
                {/* 重複的卡片組件可以進一步抽象化 */}
                <Card title="貼心服務，專屬幸福！" image={cardImg1} text="貼心服務、多樣化創意！..." />
                <Card title="尊榮環境，視覺享受！" image={cardImg2} text="我們將美味重新定義，打造貼心服務與美味食物的對話環境，..." />
                <Card title="安心防疫，幸福團聚！" image={cardImg3} text="幸福團聚時刻，芳鍋升級防疫措施。..." />
            </div>
        </React.Fragment>
    );
}

export default FeatureSection;
