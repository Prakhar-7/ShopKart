import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom' 
import Navbar from '../Navbar/Navbar'
import {
  getCartItems,
  addItem,
  removeItem,
} from '../../slices/productSlice/productSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Product = () => {
  const dispatch = useDispatch()
  const { items, idAdded, status } = useSelector((store) => store.cart)

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCartItems())
    }, [dispatch])
  }, [dispatch])

  const truncateDescription = (description) => {
    const words = description.split(' ')
    return words.length > 25
      ? words.slice(0, 25).join(' ') + '...'
      : description
  }

  const handleAddToCart = (item) => {
    dispatch(addItem(item))
    notify('🛍️ Item Added to Cart!')
  }

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item.id))
    notify('🗑️ Item Removed from Cart!')
  }

  const notify = (message) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      style: {
        transition: 'Bounce',
      },
    })
  }

  return (
    <div>
      {status == 'loading' ? (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black  z-50">
          <div className="loader ease-linear rounded-full border-t-8 border-red-500 h-32 w-32 animate-spin text-red-500"></div>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 z-0 pt-[100px] gap-4 justify-center p-4">
            {items?.map((item, index) => (
              <div
                key={index}
                className="max-w-md rounded overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 bg-white relative"
              >
                <Link to={`/product/${item.id}`}>
                  {' '}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-64 object-cover"
                  />
                </Link>
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
                  {!idAdded.includes(item.id) ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 absolute bottom-4 right-4"
                    >
                      Remove Item
                    </button>
                  )}
                </div>
              </div>
            ))}
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
