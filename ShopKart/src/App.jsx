

import './App.css'
import Home from './Components/Pages/Home';
import Cart from './Components/Pages/Cart';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/Cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
