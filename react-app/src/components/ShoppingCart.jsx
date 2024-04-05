import React from 'react';
import { useHistory } from 'react-router-dom';
function ShoppingCart() {
  const history = useHistory();
  // function ShoppingCart({ cartItems, mainOrderId }) {
  //     const history = useHistory();
  //     const totalAmount = cartItems.reduce((total, item) => total + (item.quantity * item.Price), 0);
  const mainOrderId = 1;
  const handleConfirmOrder = () => {
    history.push(`/confirmsuborder/${mainOrderId}`);
  };

  return (
    <aside>
      <div>
        <h2>購物車 Menu</h2>
        <div>
          {/* {cartItems.map(item => (
          <div key={item.Id}>
            <p>{item.MenuItemName}: {item.quantity} x ${item.Price} = ${item.quantity * item.Price}</p>
          </div>
        ))}
        <h3>总计: ${totalAmount}</h3> */}
        </div>
      </div>
      <div>
        <div className='text-space-between'><p>SUBTOTAL</p><p>$150</p></div>
        <div className='text-space-between'><p>TAX</p><p>$15</p></div>
        <div className='text-space-between'><p>TOTAL</p><p>$165</p></div>
        <button onClick={handleConfirmOrder}>確認訂單</button>
      </div>
    </aside >
  );
}

export default ShoppingCart;
