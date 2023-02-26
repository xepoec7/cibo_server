import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/menu' element={<MenuPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
