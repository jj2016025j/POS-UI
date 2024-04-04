import React from 'react';
import { useHistory } from 'react-router-dom';
function ShoppingCart() {

  // function ShoppingCart({ cartItems, mainOrderId }) {
  //     const history = useHistory();
  //     const totalAmount = cartItems.reduce((total, item) => total + (item.quantity * item.Price), 0);

  //     const handleConfirmOrder = () => {
  //         history.push(`/confirmsuborder/${mainOrderId}`);
  //     };

  return (
    <aside>
      <h2>购物车</h2>
      {/* {cartItems.map(item => (
          <div key={item.Id}>
            <p>{item.MenuItemName}: {item.quantity} x ${item.Price} = ${item.quantity * item.Price}</p>
          </div>
        ))}
        <h3>总计: ${totalAmount}</h3> */}
      {/* <button onClick={handleConfirmOrder}>确认订单</button> */}
    </aside >
  );
}

export default ShoppingCart;
