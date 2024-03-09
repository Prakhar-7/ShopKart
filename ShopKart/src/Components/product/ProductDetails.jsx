import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import {
  getCartItems,
  addItem,
  removeItem,
} from '../../slices/productSlice/productSlice'
import { ToastContainer, toast } from 'react-toastify'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const { productId } = useParams() // Get the productId from URL params
  const { items, idAdded } = useSelector((store) => store.cart)

  // Find the product with matching productId
  const product = items.find((item) => item.id == productId)

  // Render loading message if product is not yet fetched
  if (!product) {
    return <div>Loading...</div>
  }

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
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



  // Render product details once fetched
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-[150px] py-5 mx-auto">
              <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1">
                  {'★'.repeat(Math.round(product.rating.rate))}
                </span>
                <span className="text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-900 font-bold text-2xl">
                ${product.price}
              </p>
              <div className="mt-4">
                {!idAdded.includes(product.id) ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
                  >
                    Remove Item
                  </button>
                )}
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default ProductDetails
