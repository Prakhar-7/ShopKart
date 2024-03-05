import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCartItems } from '../../slices/productSlice/productSlice'
import { addItem } from '../../slices/productSlice/productSlice'

const Product = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((store) => store.cart)

  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])

  const truncateDescription = (description) => {
    const words = description.split(' ')
    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...'
    }
    return description
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {items?.map((item, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            src={item.image}
            alt={item.title}
            loading='lazy'
            className="w-full h-64 object-cover"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.title}</div>
            <p className="text-gray-700 text-base">
              {truncateDescription(item.description)}
            </p>
            <p className="text-gray-900 font-bold text-xl mt-2">
              ${item.price}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm">Category: {item.category}</span>
            </div>
            <button onClick={()=>dispatch(addItem(item))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Product
