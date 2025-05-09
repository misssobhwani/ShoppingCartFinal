import React, { useState } from "react";
import { PRODUCTS, THRESHOLD } from "../Data/Constants";
import { preconnect } from "react-dom";

const ShoppingCarts = () => {
  const [cart, setCart] = useState([]);
  //To Calculate SubTotal
  const subTotal = () => {
    const excludedFreeGift = cart.filter((x) => x.id !== 99);
    const total = excludedFreeGift.reduce(function (acc, curr) {
      acc = curr.price * curr.quantity + acc;
      return acc;
    }, 0);
    return total;
  };

  const subTotalValue = subTotal();
  const progreespercent = Math.min((subTotal / THRESHOLD) * 100, 100);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const copyCart = [...prevCart];

      const exsitingItemCardIndex = copyCart.findIndex(
        (item) => item.id === product.id
      );

      if (exsitingItemCardIndex !== -1) {
        //If selected cart is exsisting card
        const updatedCart = {
          ...copyCart[exsitingItemCardIndex],
          quantity: copyCart[exsitingItemCardIndex].quantity + 1,
        };
        copyCart[exsitingItemCardIndex] = updatedCart;
      } else {
        const newCart = { ...product, quantity: 1 };
        copyCart.push(newCart);
      }
      return copyCart;
    });
  };

  const handleChange = (itemId, changeValue) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + changeValue, 1) }
          : item
      )
    );
  };

  const handleRemoveCart = (itemId, changeValue) => {
    const filteredRemovedCart = cart.filter((x) => x.id !== itemId);
    setCart(filteredRemovedCart);
  };

  console.log(cart);
  return (
    <div className="cart-body"> 
      <h1>Shopping Cart</h1>
      <h3 className="product-title">Products</h3>
      <div className="product-list">
        {PRODUCTS.map((x) => (
          <div className="product" key={x.id}>
            <h3>{x.name}</h3>
            <p>{x.price}</p>
            <button onClick={() => handleAddToCart(x)}>Add To Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart Summary</h2>
      <div>SubTotal: {subTotalValue}</div>
      {cart?.length === 0 && (
        <div>
          <div>Your cart is empty</div>
          <div>Add some products to your cart</div>
        </div>
      )}
      
        <div className="progress-container"></div>
          <div className="progress-info">
            {subTotalValue >= THRESHOLD ? (
              <span>You have unlocked free gift</span>
            ) : (
              <span>Add more items to unlock free gift</span>
            )}
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${progreespercent}%`}}></div>
            </div>
          
        
      

      {cart?.length > 0 &&
        cart.map((item) => (
          <div>
            <h3>{item.name}</h3>
            <p>Price ${item.price}</p>
            <p>Quantity {item.quantity}</p>
            <>
              <button onClick={() => handleChange(item.id, +1)}>+</button>
              <button onClick={() => handleChange(item.id, -1)}>-</button>
              <button onClick={() => handleRemoveCart(item.id)}>
                Remove from Cart
              </button>
            </>
          </div>
        ))}
    </div>
  );
};

export default ShoppingCarts;
