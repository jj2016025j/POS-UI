import React from 'react';
import ActivityCard from './ActivityCard'; // 假設ActivityCard組件和這個文件在同一個目錄下

function ActivitiesSection() {
  const activities = [
    {
      startDate: '2024.02.06',
      endDate: '2024.07.31',
      title: '芳鍋會員優惠 登入換好禮',
      description: '芳鍋感謝回饋　登入會員免費招待您!',
      imageUrl: './image/廣告/活動3.png',
      details: [
        '兌換日期2024/2/5-07/31',
        '首次來店用餐，內用消費滿千, 點餐出示會員登入畫面，即可免費獲得招待商品。',
        '招待商品不定時更換，以當日店家公告為主。',
        '本優惠不得與其他折扣或贈菜等優惠合併使用。',
        '芳鍋日式鍋物保留活動更改、解釋、中止之權利。'
      ],
    },
    // 其他活動信息可以按照相同的格式添加...
  ];

  return (
    <div>
      {activities.map((activity, index) => (
        <ActivityCard key={index} {...activity} />
      ))}
    </div>
  );
}

export default ActivitiesSection;
