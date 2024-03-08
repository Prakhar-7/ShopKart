import { configureStore } from '@reduxjs/toolkit';
import Cartreducer from './src/slices/productSlice/productSlice'

export const store=configureStore({
    reducer:{
        cart:Cartreducer
    }
},);
