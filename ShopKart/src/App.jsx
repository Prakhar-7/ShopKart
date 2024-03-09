import './App.css'
import Home from './Components/Pages/Home'
import Cart from './Components/Pages/Cart'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from './Components/product/ProductDetails'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
