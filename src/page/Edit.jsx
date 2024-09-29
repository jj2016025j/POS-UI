import React from 'react';
import EditMenuItem from '../components/EditMenuItem';
import Categories from '../components/Categories';
import Title from '../components/Title';
import { useEditContext } from '../contexts/EditContext'

function ItemEdit() {
    const {
        menuData,
        setEditingItem,
        scrollToCategory,
        categoryRefs 
    } = useEditContext();

    const handleAddNewItem = () => {
        // 刷新成空白編輯區域
        console.log("Adding new item");
        // 这里应该包含实际的添加新项逻辑
        setEditingItem({ MenuItemName: "", Price: "", CategoryId: "", image_url: "" });
    };

    return (
        <React.Fragment>
            <Title />
            <Categories menuData={menuData} scrollToCategory={scrollToCategory} />
            <button className='create-new-item-button' onClick={handleAddNewItem}>+</button>
            <div className='function'>
                <div className='menu'>
                    {menuData.categories.map(category => (
                        <div key={category.Id} ref={categoryRefs.current[category.Id]} className='category-section'>
                            <h1>{category.CategoryName}</h1>
                            <div className='menu-item-list'>
                                {menuData.menuItems.filter(item => item.CategoryId === category.Id).map(item => (
                                    <EditMenuItem key={item.Id} item={item} />
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
