import React from 'react';

function MenuItemInfo({ item }) {
    return (
        <div className='edit-item-info'>
            <img src={item.image_url} alt={item.MenuItemName} style={{ width: '100px', height: '100px' }} />
            <div className='edit-name-price'>
                <p className='text-overflow'>{item.MenuItemName}</p>
                <p>${item.Price}</p>
            </div>
        </div>
    );
}

export default MenuItemInfo;
