import axios from 'axios';
import { useState } from 'react';

const useReport = () => {
    const [reportData, setReportData] = useState()
    const useReport = {
        getReportFunc: () => {
            console.log(data)
            axios.post('/data', data)
                .then(response => {
                    setReportData(response.data)
                    return response.data; // 返回請求結果
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        getReport: reportData,
        getAll:()=>{
            fetch('/data/all')
            .then(response => {
              return response.json()
            })
            .catch(error => console.error('Error fetching data:', error));      
        }
    }
    return { ...useReport }
};

export { useReport };

const data = {
    startTime: '2023-01-01T00:00:00Z',
    endTime: '2023-02-02T00:00:00Z',
    statisticalContent: 'all' //'classification' 'items'
}

