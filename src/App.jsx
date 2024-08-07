import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MyRouter from './MyRouter';
import Header from './components/Header';
import Nav from './components/Nav';

import { CartProvider } from './contexts/CartContext';
import { EditProvider } from './contexts/EditContext';

function App() {
    return (
        <EditProvider>
            <CartProvider>
                <BrowserRouter>
                    <div className="myBody">
                        <Header />
                        <Nav />
                        <MyRouter />
                    </div>
                </BrowserRouter>
            </CartProvider>
        </EditProvider>
    );
}

export default App;

/**
 * 根據網址改變內容
 * 切分為導行列、主要內容、側邊攔
 */