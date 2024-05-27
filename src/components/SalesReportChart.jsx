import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Button, Select, Space, DatePicker, } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useReport } from '../api/useReport';

// 注册Chart.js的组件
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
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
  const [items, setItems] = useState([]);
  const [unit, setUnit] = useState('sales');
  const [sellData, setSellData] = useState([]);
  const [content, setContent] = useState('all');// 'all' 'classification' 'items'
  const [weekStart, weekEnd] = getWeekStartAndEnd();

  const { getReport, getReportFunc, getAll } = useReport()

  // 日期 多選 單選
  useEffect(() => {
    getAll()
    getReportFunc()
    setContent('all')
  }, []);

  useEffect(() => {
    console.log('unit', unit)
    console.log('items', items)
    console.log('content', content)
    console.log('typeOf', typeof content)
  }, [items, unit, content]);

  useEffect(() => {
    setSellData(getReport)
  }, [getReport]);

  const showData = sellData ? generateChartData(sellData, content) : [];
  // const itemOptions = sellData ? sellData.flatMap((data) => {
  //   if (content === 'classification') {
  //     return data.classification.map((category) => ({
  //       label: category.categoryName,
  //       value: category.categoryName,
  //       desc: category.categoryName,
  //     }));
  //   } else if (content === 'items') {
  //     return data.items.map((item) => ({
  //       label: item.itemName,
  //       value: item.itemName,
  //       desc: item.itemName,
  //     }));
  //   } else {
  //     return [];
  //   }
  // }) : [];

  return (
    <div className="chart-container">
      <Space>
        {/* <DatePicker defaultValue={today} /> */}
        <RangePicker defaultValue={[weekStart, weekEnd]} />
        選擇單位:
        <Select
          defaultValue="銷售額"
          style={{
            width: 120,
          }}
          onChange={setUnit}
          options={option}
        />
        選擇統計內容:
        <Select
          defaultValue="全部"
          style={{
            width: 120,
          }}
          onChange={(e) => { setContent(e) }}
          options={[
            {
              value: 'all',
              label: '全部',
            },
            {
              value: 'classification',
              label: '分類',
            },
            {
              value: 'items',
              label: '單品項',
            },
          ]}
        />
        {content != 'all' && (
          <>
            <span>選擇品項:</span>
            <Select
              mode="multiple"
              style={{
                width: '100%',
                minWidth: 200
              }}
              placeholder="選擇品項"
              defaultValue={[]}
              onChange={setItems}
              // options={itemOptions}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.label}>
                    {option.emoji || '🍲'}
                  </span>
                  {option.desc}
                </Space>
              )}
            />
          </>
        )}
        <Button>查詢</Button>
      </Space>
      <br />
      <Line data={showData} />
    </div>
  );
}

export default AllData;

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

const getRandomColor = (opacity = 1) => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const generateChartData = (sellData, content) => {
  let labels
  const datasets = [];

  if (content === 'all') {
    labels = sellData.map(data => data.OrderDate);
    datasets.push({
      label: '總銷售額',
      data: sellData.map(data => parseInt(data.TotalSales, 10)),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    });
  } else if (content === 'classification') {
    const categories = ['Meat', 'Vegetables', 'Seafood', 'Drinks', 'Desserts'];

    categories.forEach(category => {
      datasets.push({
        label: `${category}`,
        // data: sellData.map(data => {
        //   const categoryData = data.classification.find(c => c.categoryName === category);
        //   return categoryData ? parseInt(categoryData.TotalSales, 10) : 0;
        // }),
        data: {},
        borderColor: getRandomColor(), // You can define a function to get random colors
        backgroundColor: getRandomColor(0.5),
      });
    });
  } else if (content === 'items') {
    const items = ['Beef', 'Pork', 'Cabbage', 'Shrimp', 'Coke', 'Ice Cream'];

    items.forEach(item => {
      datasets.push({
        label: `${item}`,
        // data: sellData.map(data => {
        //   const itemData = data.items.find(i => i.itemName === item);
        //   return itemData ? parseInt(itemData.TotalSales, 10) : 0;
        // }),
        data: {},
        borderColor: getRandomColor(), // You can define a function to get random colors
        backgroundColor: getRandomColor(0.5),
      });
    });
  }

  return {
    labels,
    datasets,
  };
};