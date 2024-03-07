import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, increment, decrement } from '../../slices/productSlice/productSlice'

const Cart = () => {
  const { cartItems } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Cart Items</h1>
      {cartItems.map((item) => (
        <div
          key={item?.id}
          className="cart-item flex items-center border-b border-gray-200 py-4"
        >
          <img
            src={item && item.image}
            alt={item && item.title}
            className="w-16 h-16 object-cover rounded mr-4"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{item && item.title}</h3>
              <p className="text-gray-700">${item?.price}</p>
            </div>
            <div className="flex items-center">
              <div
                onClick={() => dispatch(removeItem(item?.id))}
                className="cursor-pointer text-gray-500 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 8h16M9 12h6M7 5v14H17V5H7Z"></path>
                </svg>
              </div>
              <div className="flex items-center mx-4">
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => {dispatch(decrement(item))
                  if(item.amount<=1){
                    dispatch(removeItem(item?.id))
                  }}}
                >
                  -
                </button>
                <span className="mx-2">{item?.amount}</span>
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => dispatch(increment(item))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cart
