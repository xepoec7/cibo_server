import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import NotFoundPage from './pages/NotFoundPage';
import TablePage from './pages/TablePage';
import DetailsPage from './pages/DetailsPage';
import CartPage from './pages/CartPage';


function App() {

    return (
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/menu' element={<MenuPage />} />
            
            <Route path='*' element={<NotFoundPage />} />
          </Route>
          <Route path='/tableservice/:table' element={<TablePage />} />
          <Route path='/tableservice/product/' element={<DetailsPage />} />
          <Route path='/tableservice/cart/' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
