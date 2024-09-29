import React from 'react';
import { useLocation } from 'react-router-dom';

const SubTitle = () => {
    const location = useLocation();
    let title = '發生錯誤 ERROR'; // 預設標題

    // 使用正則表達式來匹配動態路徑
    if (/^\/order\/.+$/.test(location.pathname)) {
        title = '購物車 MENU';
    } else if (/^\/editMenuItem\/.+$/.test(location.pathname)) {
        title = '品項編輯 EDIT';
    } else {
        // 基於路徑的靜態標題匹配
        switch (location.pathname) {
            case '/order':
                title = '購物車 MENU';
                break;
            case '/editMenuItem':
                title = '品項編輯 EDIT';
                break;
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
        </div>
    )

};

export default SubTitle;