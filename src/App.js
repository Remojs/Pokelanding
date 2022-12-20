// import dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'

//import components
import Error from './components/pages/Error'
import Formulario from './components/pages/Formulario';
import Navbar from './components/Navbar';
import Pokemons from './components/PokedexComponents/Pokemons';
import News from './components/pages/News';

function App() {
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [text, setText] = useState('')


useEffect(() => {
  const getPokemon = async () => {
        const res = await axios.get('https://backend-pwa-production-82ba.up.railway.app/datos');
        const data = res.data.datos
        setPokemons(data)
        setLoading(false)
  }

  getPokemon()
})

// variable de pokemon filtrados
const FiltredPokes = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(text.toLowerCase()))


  return (
    <BrowserRouter>

    <Navbar />
      <Routes>
          <Route path='/' index element={loading ? <div class="lds-hourglass"></div> : <Pokemons text={text} setText={setText} pokemons={FiltredPokes}/>}/>  
          <Route path='*' element={<Error/>} />   
          <Route path='/formulario' element={<Formulario/>}/> 
          <Route path='/news' element={<News/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;




