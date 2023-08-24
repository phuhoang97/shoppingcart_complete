import React, { useState } from "react";
import Product from "./Product";
import "./Product.css";
import Cart from "./Cart";

function ListProduct() {
  const [dataProduct, setDataProduct] = useState([
    { id: 1, name: "Cơm gà", image: "1.PNG", price: 120000 },
    { id: 2, name: "Gà rán", image: "2.PNG", price: 120000 },
    { id: 3, name: "Salat Cá Hồi", image: "3.PNG", price: 240000 },
    { id: 4, name: "Súp Bí Đỏ", image: "4.PNG", price: 140000 },
    { id: 5, name: "Salat Rau", image: "5.PNG", price: 100000 },
    { id: 6, name: "Pizza", image: "6.PNG", price: 220000 },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [cartProduct, setCartProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (product) => {
    const existingProduct = cartProduct.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setCartProduct([...cartProduct]);
    } else {
      setCartProduct([...cartProduct, { ...product, quantity: 1 }]);
    }
    setTotalAmount(calculateTotalAmount(cartProduct));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId); // Gọi hàm xóa sản phẩm khỏi giỏ hàng
    }
    if (newQuantity >= 1) {
      const updatedCart = cartProduct.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartProduct(updatedCart);
      let updatedTotal = 0;
      for (const item of updatedCart) {
        updatedTotal += item.price * item.quantity;
      }
      setTotalAmount(calculateTotalAmount(updatedCart));
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartProduct.filter((item) => item.id !== itemId);
    setCartProduct(updatedCart);
    setTotalAmount(calculateTotalAmount(updatedCart));
  };

  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      <div className='shopping'>
        <i
          className='fa-solid fa-cart-shopping'
          onClick={() => setIsCartOpen(true)}
        ></i>
        <span className='quantity'>{cartProduct.length}</span>
      </div>

      <div>
        <div className='list-product'>
          {dataProduct.map((element, index) => (
            <Product
              key={index}
              elementProduct={element}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {isCartOpen && (
        <Cart
          setIsCartOpen={setIsCartOpen}
          cartProduct={cartProduct}
          updateQuantity={updateQuantity}
          totalAmount={totalAmount}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

export default ListProduct;
