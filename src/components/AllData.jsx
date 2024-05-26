import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Button, Select, Space, DatePicker, } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';

// 注册Chart.js的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

dayjs.extend(isToday);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

const { RangePicker } = DatePicker;

const getWeekStartAndEnd = () => {
  const startOfWeek = dayjs().startOf('week');
  const endOfWeek = dayjs().endOf('week');
  return [startOfWeek, endOfWeek];
};

// 選擇日期後 自動查詢
// 選擇分類或單品 自動搜尋所有選項 
// 銷售額跟銷售數量都要拿下來

function AllData() {
  const [sellData, setSellData] = useState([]);
  const today = dayjs();
  const [weekStart, weekEnd] = getWeekStartAndEnd();

  console.log(today, weekStart, weekEnd)
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // 日期 多選 單選
  useEffect(() => {
    fetch('/data/all')
      .then(response => {
        console.log('response', response)
        return response.json()
      })
      .then(data => {
        console.log('json', data)
        setSellData(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: sellData.map(data => data.OrderDate),
    datasets: [
      {
        label: '總銷售額',
        data: sellData.map(data => parseInt(data.TotalSales, 10)),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: '總銷售額',
        data: sellData2.map(data => parseInt(data.TotalSales, 10)),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <Space>
        {/* <DatePicker defaultValue={today} /> */}
        <RangePicker defaultValue={[weekStart, weekEnd]} />

        選擇統計內容:
        <Select
          defaultValue="全部"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: '全部',
              label: '全部',
            },
            {
              value: '分類',
              label: '分類',
            },
            {
              value: '單品項',
              label: '單品項',
            },
          ]}
        />
        選擇品項:
        <Select
          mode="multiple"
          style={{
            width: '100%',
          }}
          placeholder="選擇品項"
          defaultValue={['五花牛']}
          onChange={handleChange}
          options={options}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.desc}
            </Space>
          )}
        />
        選擇單位:
        <Select
          defaultValue="銷售額"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={option}
        />
        <Button>查詢</Button>
      </Space>
      <br />
      <Line data={data} />
    </div>
  );
}

export default AllData;


const options = [
  {
    label: '五花牛',
    value: 'cow',
    desc: '(菜)五花牛',
  },
  {
    label: '雪花牛',
    value: 'cow2',
    desc: '(肉)雪花牛',
  },
  {
    label: '雪花豬',
    value: 'pig',
    desc: '(菜)雪花豬',
  },
  {
    label: '精選豬',
    value: 'pig2',
    desc: '精選豬',
  },
];

const option = [
  {
    label: '銷售額',
    value: 'sales',
    desc: '銷售額',
  },
  {
    label: '銷售數量',
    value: 'quantity',
    desc: '銷售數量',
  },
];

const sellData2 = [
  {
    "OrderDate": "2024-04-13",
    "TotalQuantity": "6",
    "TotalSales": "21065"
  },
  {
    "OrderDate": "2024-04-14",
    "TotalQuantity": "52",
    "TotalSales": "4200"
  },
  {
    "OrderDate": "2024-04-15",
    "TotalQuantity": "8",
    "TotalSales": "2600"
  },
  {
    "OrderDate": "2024-04-16",
    "TotalQuantity": "8",
    "TotalSales": "2185"
  },
  {
    "OrderDate": "2024-04-18",
    "TotalQuantity": "9",
    "TotalSales": "4400"
  },
  {
    "OrderDate": "2024-04-20",
    "TotalQuantity": "7",
    "TotalSales": "4650"
  }
]
