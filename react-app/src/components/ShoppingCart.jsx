import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import SubTitle from '../components/SubTitle';
import { useCart } from '../contexts/CartContext';

function ShoppingCart() {
  const history = useHistory();
  const { mainOrderId } = useParams();
  const { TablesInfo, updateTableOrder } = useCart();

  // 获取指定桌号的订单信息和摘要
  const itemsForTable = TablesInfo[mainOrderId]?.items || [];
  const orderSummary = TablesInfo[mainOrderId]?.summary;

  console.log("cartItems", TablesInfo);
  console.log("orderSummary", orderSummary);

  const handleConfirmOrder = () => {
    if (!itemsForTable.length) {
      alert("購物車是空的，請添加品項後再確認訂單。");
    } else {
      axios.post(`/order/addSubOrder/${mainOrderId}`)
        .then((response) => {
          const subOrderId = response.data.SubOrderId;
          console.log(`新建訂單成功，訂單ID: ${subOrderId}`);
          history.push(`/confirmsuborder/${mainOrderId}?subOrderId=${subOrderId}`);
        })
        .catch(error => {
          console.error('Error fetching TableId:', error);
        });
    }
  };

  return (
    <aside>
      <SubTitle />
      <div className='cart-list-group'>
        <div>
          {itemsForTable.map(item => (
            <div key={item.Id}>
              <p>{item.MenuItemName}: {item.quantity} x ${item.Price} = ${item.quantity * item.Price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='cart-total-group'>
        <div className='text-space-between'><p>TOTAL</p><p>${orderSummary?.total || 0}</p></div>
        <button className='confirm-order-button' onClick={handleConfirmOrder}>確認訂單</button>
      </div>
    </aside>
  );
}

export default ShoppingCart;
