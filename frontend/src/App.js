import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import OrderLayout from './layouts/OrderLayout';
import TerminalLayout from './layouts/TerminalLayout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import TerminalPage from './pages/TerminalPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/menu' element={<MenuPage />} />
        </Route>
      </Routes>

      <Routes>
        <Route path='/order' element={<OrderLayout />}>
          <Route index element={<OrderPage />} />
        </Route>
      </Routes>

      <Routes>
        <Route path='/terminal' element={<TerminalLayout />}>
          <Route index element={<TerminalPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
