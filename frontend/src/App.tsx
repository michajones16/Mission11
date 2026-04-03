import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CartProvider } from './context/CartContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import CartPage from './pages/CartPage'
import ShopPage from './pages/ShopPage'
import AdminBooksPage from './pages/AdminBooksPage';

function App() {

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<BooksPage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route path='/shop/:title/:bookID' element={<ShopPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/adminbooks' element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
