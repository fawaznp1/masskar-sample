import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './components/Home';
import FishList from './components/fishList';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthForm from './components/Login';
import About from './components/About';
import DeliveryLocations from './components/DeliveryLocation';
import Cart from './components/Cart';
import CookieConsent from './components/Cookies';
import MeatCard from './components/meatCard';
import MeatList from './components/meatList';

function App() {
  return (
    
     <BrowserRouter>
     <CookieConsent/>
     <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/fishcard' element={<FishList />}></Route>
                <Route path='/meatcard' element={<MeatList />}></Route>

        <Route path='/login' element={<AuthForm />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/locations' element={<DeliveryLocations />}></Route>
        <Route path='/login' element={<AuthForm />}></Route>
        <Route path='/cart' element={<Cart />}></Route>

      </Routes>
      <Footer />
      </BrowserRouter>

  );
}

export default App;
