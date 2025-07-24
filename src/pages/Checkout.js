import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setSubmitted(true);

    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
      navigate('/');
    }, 2500);
  };

  if (cart.length === 0 && !submitted) {
    return <p style={{ padding: '2rem' }}>Your cart is empty. <Link to="/">Return to shop</Link></p>;
  }

  return (
    <div className="container">
      <h2>🧾 Order Summary</h2>

      {submitted ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>✅ Thank you for your purchase!</h3>
          <p>You will be redirected to the homepage...</p>
        </div>
      ) : (
        <>
          <ul className="checkout-list">
            {cart.map(item => (
              <li key={item.id}>
                {item.title.slice(0, 40)}... × {item.quantity} = ${(
                  item.price * item.quantity
                ).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Submit Order</button>
        </>
      )}
    </div>
  );
}

export default Checkout;
