import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import EditMenuItem from '../components/EditMenuItem';
import Categories from '../components/Categories';

function ItemEdit() {
    const [menuData, setMenuData] = useState({ categories: [], menuItems: [] });
    const [editingItem, setEditingItem] = useState(null);
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

    console.log(editingItem);
    const scrollToCategory = (categoryId) => {
        const ref = categoryRefs.current[categoryId];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleAddNewItem = () => {
        // 设置一个新的空白菜单项以开始添加
        console.log("Adding new item");
        // 这里应该包含实际的添加新项逻辑
        setEditingItem({ MenuItemName: "", Price: "", CategoryId: "", image_url: "" });
    };

    return (
        <React.Fragment>
            <Categories menuData={menuData} scrollToCategory={scrollToCategory} categoryRefs={categoryRefs} />
            <button onClick={handleAddNewItem}>新增品项</button>
            <div className='function'>
                <div className='menu'>
                    {menuData.categories.map(category => (
                        <div key={category.Id} ref={categoryRefs.current[category.Id]} className='category-section'>
                            <h1>{category.CategoryName}</h1>
                            <div className='menu-item-list'>
                                {menuData.menuItems.filter(item => item.CategoryId === category.Id).map(item => (
                                    <EditMenuItem item={item} setMenuData={setMenuData} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default ItemEdit;
