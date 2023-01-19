import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import NotFoundPage from './pages/NotFoundPage';
import OrderLayout from './layouts/OrderLayout';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderCompletePage from './pages/OrderCompletePage';


function App() {

    return (
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
          
          <Route path='/order' element={<OrderLayout />} >
            <Route index element={<OrderPage />} />
            <Route path=':client_params/' element={<OrderPage />} />
            <Route path='product/' element={<ProductPage />} />
            <Route path='cart/' element={<CartPage />} />
            <Route path='complete/' element={<OrderCompletePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
