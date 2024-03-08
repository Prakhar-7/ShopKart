import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  status: 'idle', // Added loading state
  error: null, // Added error state
  cartItems: [],
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

export const CartitemSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems = [...state.cartItems, { ...action.payload, amount: 1 }]
      console.log(state.cartItems)
    },
    removeItem: (state, action) => {
      const updatedCart = state.cartItems.filter((item) => {
        if (item?.id !== action.payload) {
          return item
        }
      })
      state.cartItems = updatedCart
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
        console.log(action.payload)
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message // Set error message on failure
      })
  },
})
export const {addItem, removeItem, increment, decrement} = CartitemSlice.actions
export default CartitemSlice.reducer
