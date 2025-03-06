import React from 'react';

function MenuItemInfo({ item }) {
    return (
        <div className='edit-item-info'>
            <img src={item.imageUrl} alt={item.menuItemName} style={{ width: '100px', height: '100px' }} />
            <div className='edit-name-price'>
                <p className='text-overflow'>{item.menuItemName}</p>
                <p>${item.price}</p>
            </div>
        </div>
    );
}

export default MenuItemInfo;
