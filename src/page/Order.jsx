/**
 * 取得分類並顯示V
 * 取得品項並傳給品項組件V
 * 點擊分類會轉到分類的品項V
 */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';

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
            <div className='categories'>
                {menuData.categories.map(category => (
                    <div key={category.Id} className='category' onClick={() => scrollToCategory(category.Id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                        </svg>
                        <div key={category.Id} onClick={() => scrollToCategory(category.Id)} style={{ cursor: 'pointer' }}>
                            {category.CategoryName}
                        </div>
                    </div>
                ))}
            </div>
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
