/**
 * 取得分類並顯示V
 * 取得品項並傳給品項組件V
 * 點擊分類會轉到分類的品項V
 */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../../components/MenuItem';
import Categories from '../../components/Categories';
import Title from '../../components/Title';

function Menu() {
    const [menuData, setMenuData] = useState({ categories: [], menuItems: [] });
    const categoryRefs = useRef({});

    useEffect(() => {
        axios.get('/menu/getAllMenuItems')
            .then(response => {
                const items = response.data; // API 回傳的所有品項

                // 建立分類對應表
                const categoriesMap = {};
                const menuItems = [];

                items.forEach(item => {
                    const categoryId = item.categoryId;

                    // 如果這個分類還沒建立，就初始化
                    if (!categoriesMap[categoryId]) {
                        categoriesMap[categoryId] = {
                            id: categoryId,
                            name: `分類 ${categoryId}`, // 這裡可以改成 API 提供的分類名稱
                            items: []
                        };
                    }

                    // 將品項加入對應分類
                    categoriesMap[categoryId].items.push(item);
                    menuItems.push(item); // 存全部品項
                });

                // 更新 menuData
                setMenuData({
                    categories: Object.values(categoriesMap), // 轉換成陣列
                    menuItems
                });

                // 更新 categoryRefs
                categoryRefs.current = Object.values(categoriesMap).reduce((acc, category) => {
                    acc[category.id] = React.createRef();
                    return acc;
                }, {});
            })
            .catch(error => console.error('Fetching menu data error: ', error));
    }, []);

    const scrollToCategory = (categoryId) => {
        const ref = categoryRefs.current[categoryId];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <React.Fragment>
            <Title />
            <Categories menuData={menuData} scrollToCategory={scrollToCategory} categoryRefs={categoryRefs} />
            <div className='function'>
                <div className='menu'>
                    {menuData.categories.map(category => (
                        <div key={category.Id} ref={categoryRefs.current[category.Id]} className='category-section'>
                            <h1>{category.CategoryName}</h1>
                            <div className='menu-item-list'>
                                {menuData.menuItems.filter(item => item.CategoryId === category.Id).map(item => (
                                    <MenuItem key={item.Id} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Menu;
