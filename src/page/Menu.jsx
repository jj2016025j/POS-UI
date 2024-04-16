/**
 * 取得分類並顯示V
 * 取得品項並傳給品項組件V
 * 點擊分類會轉到分類的品項V
 */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import Categories from '../components/Categories';

function Menu() {
    const [menuData, setMenuData] = useState({ categories: [], menuItems: [] });
    const categoryRefs = useRef({});

    useEffect(() => {
        axios.get('/menu')
            .then(response => {
                setMenuData(response.data);
                categoryRefs.current = response.data.categories.reduce((acc, category) => {
                    acc[category.Id] = React.createRef();
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
