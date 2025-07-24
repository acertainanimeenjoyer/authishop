import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id, qty) => {
    const quantity = parseInt(qty);
    if (quantity >= 1) {
      dispatch({ type: 'UPDATE', payload: { id, quantity } });
    }
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Shop now</Link>.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
                <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(item => (
                <tr key={item.id}>
                    <td className="product-info">
                    <img src={item.image} alt={item.title} />
                    <span>{item.title.slice(0, 40)}...</span>
                    </td>
                    <td>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, e.target.value)}
                    />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                    <button onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}>
                        ❌
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
