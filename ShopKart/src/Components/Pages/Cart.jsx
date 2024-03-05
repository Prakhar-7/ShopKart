import React from 'react'
import { useSelector} from 'react-redux'


const Cart = () => {
    const {cartItems} = useSelector((store) => store.cart)
  return (
    <div>
      {cartItems.map((item) => {
        return (
          <div className="cart-item flex items-center border-b border-gray-200 py-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-700">${item.price}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cart
