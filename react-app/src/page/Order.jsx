import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // 引入useParams
import MenuItem from '../components/MenuItem';
import ShoppingCart from '../components/ShoppingCart';

function Menu() {
    const { mainOrderId } = useParams(); // 从URL获取mainOrderId
    const [menuData, setMenuData] = useState({ categories: [], menuItems: [] });
    const [cartItems, setCartItems] = useState([]);
    const categoryRefs = useRef({});

    useEffect(() => {
        // 假设通过axios从后端获取菜单数据
        axios.get('http://localhost:8080/menu')
            .then(response => {
                setMenuData(response.data);
                // 初始化每个分类的ref
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

    const handleAddToCart = (item, quantity) => {
        setCartItems(prevItems => {
            const itemIndex = prevItems.findIndex(it => it.Id === item.Id);
            if (itemIndex > -1) {
                const newItems = [...prevItems];
                newItems[itemIndex].quantity = quantity;
                return newItems.filter(it => it.quantity > 0);
            } else if (quantity > 0) {
                return [...prevItems, { ...item, quantity }];
            }
            return prevItems;
        });
    };

    return (
        <div>
            <h1>Menu Categories</h1>
            <ul>
                {menuData.categories.map(category => (
                    <li key={category.Id} onClick={() => scrollToCategory(category.Id)} style={{ cursor: 'pointer' }}>
                        {category.CategoryName}
                    </li>
                ))}
            </ul>
            <div>
                {menuData.categories.map(category => (
                    <div key={category.Id}>
                        <h2>{category.CategoryName}</h2>
                        {menuData.menuItems.filter(item => item.CategoryId === category.Id).map(item => (
                            <MenuItem key={item.Id} item={item} onAddToCart={handleAddToCart} />
                        ))}
                    </div>
                ))}
                <ShoppingCart cartItems={cartItems} mainOrderId={mainOrderId}/>
            </div>
        </div>
    );
}

export default Menu;
