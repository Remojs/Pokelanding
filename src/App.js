import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

import Error from './pages/Error'
import { Home } from './pages/Home'
import About from './pages/About';
import Productos from './pages/Productos';
import Formulario from './pages/Formulario';
import Layout from './components/Layout';
import Info from './components/Info';


function App() {
  const [poke, setPoke] = useState('')






  return (
    <BrowserRouter>
      <Layout />
      <Routes>
          <Route path='/' element={<Home/>} />    
          <Route path='*' element={<Error/>} />  
          <Route path='/about' element={<About/>} /> 
          <Route path='/api' element={<Info poke={poke} setPoke={setPoke} />} />
          <Route path='/productos' element={<Productos/>} />
          <Route path='/formulario' element={<Formulario/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;




