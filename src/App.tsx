import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './components/Home';
import FishList from './components/fishList';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
                <Route path='/fishcard' element={<FishList />}></Route>

      </Routes>
      </BrowserRouter>

  );
}

export default App;
