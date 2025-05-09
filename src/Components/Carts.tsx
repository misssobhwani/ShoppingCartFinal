
import { useState } from 'react'
import { CartItem, Product } from '../Types/Cart.type'
import { FREE_GIFT, PRODUCTS, THRESHOLD } from '../Data/Constants'


const Carts = () => {
  const [carts, setCarts] = useState<CartItem[]>([])
  const [showGift, setShowGift] = useState(false);
  const [giftAdded, setGiftAdded] = useState(false);
  const calculateTotal = () => {
    const excludedFreeGift = carts.filter((item) => item.id !== 99);
    const total = excludedFreeGift.reduce(function(acc,curr){
       acc= (curr.price * curr.quantity)+ acc
       return acc;
    },0);

    return total;
  }
  const subtotal = calculateTotal();
  const progressPercent = Math.min((subtotal / THRESHOLD) * 100, 100);
  const amountRemaining = Math.max(THRESHOLD - subtotal, 0);
  console.log(calculateTotal());

  const handleAddToCart = (product: Product) => {
    setCarts((prevCart)=>{
      const copyCart=[...prevCart]
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex!== -1) {
        // Correctly use existingProductIndex here
      const updatedCart = {
        ...copyCart[existingProductIndex],
        quantity: copyCart[existingProductIndex].quantity + 1,
      };
      copyCart[existingProductIndex] = updatedCart;
      }
      else{
        const newProduct = { ...product, quantity: 1 };
        copyCart.push(newProduct);
      }
      return copyCart;
    })
  }

  console.log(carts);

  const handleQuantityChange = (productId:number, change:number) => {
    setCarts((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };
  const handleremoveCart = (productId:number) => {
  const filteredCart = carts.filter((item) => item.id !== productId); 
  setCarts(filteredCart); 
    //setCarts((prevCart) => prevCart.filter((item) => item.id !== productId));
  }
  return (
    <div className='cart-body'>
      <h1>Shopping Cart</h1>
      <h2 className="product-title">Products</h2>
      <div className='Product-list'>
        {PRODUCTS.map((product) => (
          <div key={product.id} className='Product'>
            <h3 className='product-info'>{product.name}</h3>
            <p className='product-info'>Price: ${product.price}</p>
            <button className='product-button' onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

    <h3>Cart Summary</h3>
    <div className='subtotal-div'>
      <div>Subtotal</div>
      <div>${subtotal}</div>
    </div>
    {subtotal>=THRESHOLD && <div>You got a free Wireless Mouse!</div>}
    <div className='progress-container'></div>
      <div className="progress-info">
          {subtotal >= THRESHOLD ? (
            <span>🎁 You've unlocked the free gift!</span>
          ) : (
            <span>Add ${amountRemaining} more to unlock the free gift!</span>
          )}
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      
      <h2>Cart Items</h2>
      {
        carts && carts.length >0 && carts.map((item) => (
          <div key={item.id} className='cart-item'>
            <h3 className='cart-info'>{item.name}</h3>
            <p className='cart-info'>Price: ${item.price}</p>
            <p className='cart-info'>Quantity: {item.quantity}</p>
            <>
            <button onClick={()=>handleQuantityChange(item.id,+1)}>+</button>
            <button onClick={()=>handleQuantityChange(item.id,-1)}>-</button>
            <button onClick={()=>handleremoveCart(item.id)}>Remove cart</button>
            </>
          </div>
        ))
      }
      {subtotal>=THRESHOLD && <div key={FREE_GIFT.id} className='cart-item'>
            <h3 className='cart-info'>{FREE_GIFT.name}</h3>
            <p className='cart-info'>Price: ${FREE_GIFT.price}</p>
            <p className='cart-info'>Quantity: {1}</p>
            <p className='cart-info'>Free Gift 🎁✨</p>
          </div>

      }
      {carts.length === 0 && <div>
        <div>Your cart is empty</div>
        <div>Please add some products to your cart.</div>
        </div>}

      <h2>Subtotal: ${subtotal}</h2>

    </div>  
  )
}

export default Carts