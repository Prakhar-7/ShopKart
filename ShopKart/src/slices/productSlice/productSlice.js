import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const url = 'https://fakestoreapi.com/products/category/'

const initialState = {
  items: [],
  status: 'idle', // Added loading state
  error: null, // Added error state
  cartItems: [],
  idAdded:[],
}

export const getCartItems = createAsyncThunk('getCart', async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    throw error // Rethrow the error to be caught in the rejected case
  }
})

export const getSearchItems = createAsyncThunk('searchCart', async (search) => {
  try {
    const response = await axios(`${url}${search}`)
    const detail = response.data
    console.log(detail)
    return detail
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const CartitemSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems = [...state.cartItems, { ...action.payload, amount: 1 }]

      state.idAdded=[...state.idAdded,action.payload.id]
      console.log(state.idAdded)
    },
    removeItem: (state, action) => {
      const updatedCart = state.cartItems.filter((item) => {
        if (item?.id !== action.payload) {
          return item
        }
      })
      
      state.cartItems = updatedCart;
      const updated=state.idAdded.filter((productId)=>{
        if(productId!==action.payload){
          return productId
        }
      })
      state.idAdded=updated;
    },
    increment: (state, action) => {
      const updatedCart = state.cartItems.map((item) =>item.id==action.payload.id?{...item,amount:item.amount+1}:item)
      state.cartItems = updatedCart
    },
    decrement: (state, action) => {
      const updatedCart = state.cartItems.map((item) =>item.id==action.payload.id?{...item,amount:item.amount-1}:item)
      state.cartItems = updatedCart
     
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
     
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null // Reset error state on success
        localStorage.setItem('product', JSON.stringify(state.items))
        console.log(action.payload)
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message // Set error message on failure
      })
      .addCase(getSearchItems.fulfilled, (state, action) => {

        state.status = "succeeded"
        
        
      })
  },
})
export const {addItem, removeItem, increment, decrement} = CartitemSlice.actions
export default CartitemSlice.reducer
