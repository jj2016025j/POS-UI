import React from 'react';
import { useLocation } from 'react-router-dom';

const TitleComponent = () => {
    const location = useLocation();
    let title = '發生錯誤 ERROR'; // 預設標題

    // 使用正則表達式來匹配動態路徑
    if (/^\/order\/.+$/.test(location.pathname)) {
        title = '品項分類 MENU CATEGORIES';
    } else if (/^\/vieworder\/.+$/.test(location.pathname)) {
        title = '查看訂單 VIEW ORDER';
    } else if (/^\/confirmsuborder\/.+$/.test(location.pathname)) {
        title = '確認訂單 CONFIRM';
    } else if (/^\/checkout\/.+$/.test(location.pathname)) {
        title = '結帳 CHECKOUT';
    } else {
        // 基於路徑的靜態標題匹配
        switch (location.pathname) {
            case '/pos':
                title = '選擇桌號 Choose table';
                break;
            case '/orderhistory':
                title = '訂單歷史 HISTORY';
                break;
            case '/editMenuItem':
                title = '品項編輯 EDIT';
                break;
            case '/report':
                title = '後臺數據 REPORT';
                break;
            case '/setting':
                title = '系統設定 SETTINGS';
                break;
            case '/role':
                title = '權限管理 ROLEMANAGEMENT';
                break;
            // 可以根據需要添加更多路徑和標題
            default:
                title = '發生錯誤 ERROR'; // 當路徑不匹配時顯示預設標題
                break;
        }
    }

    // 使用document.title設置網頁標題
    document.title = title;

    // 此組件不渲染任何實際的UI，僅用於設置標題
    return (
        <div className="title-group">
            <h1 className='title'>{title}</h1>
            <h1 className='search'>{}</h1>
        </div>
    )

};

export default TitleComponent;