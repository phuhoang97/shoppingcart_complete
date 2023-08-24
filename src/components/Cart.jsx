import React from "react";
import "./Cart.css";

function Cart({
  setIsCartOpen,
  cartProduct,
  updateQuantity,
  removeFromCart,
  totalAmount,
}) {
  return (
    <div className='cart'>
      <h1>Cart</h1>
      <ul className='listCart'>
        {cartProduct.map((element, index) => (
          <li key={index}>
            <img src={`/image/${element.image}`} alt='photo' />
            <p>
              {element.name} - {element.price}
              <button
                onClick={() => updateQuantity(element.id, element.quantity - 1)}
                // disabled={element.quantity <= 1}
              >
                <i className='fa-solid fa-minus'></i>
              </button>
              <span>{element.quantity}</span>
              <button
                onClick={() => updateQuantity(element.id, element.quantity + 1)}
              >
                <i className='fa-solid fa-plus'></i>
              </button>
              <button onClick={() => removeFromCart(element.id)}>Delete</button>
            </p>
          </li>
        ))}
      </ul>
      <div className='check-out'>
        <div className='total'>{totalAmount}</div>
        <div className='closeShopping' onClick={() => setIsCartOpen(false)}>
          Close
        </div>
      </div>
    </div>
  );
}

export default Cart;
