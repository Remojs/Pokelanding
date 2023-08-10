// import dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'

//import components
import Error from './components/Error'
import Navbar from './components/Navbar';
import Pokemons from './components/PokedexComponents/Pokemons';
import Detail from './components/Detail/Detail';

function App() {
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [text, setText] = useState('')


useEffect(() => {
  const getPokemon = async () => {
        const { data } = await axios.get('https://gottafetchthemall.onrender.com/pokedex');
        setPokemons(data)
        setLoading(false)
  }
  getPokemon()
}, [])

// variable de pokemon filtrados
const FiltredPokes = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(text.toLowerCase()))


  return (
    <BrowserRouter>

    <Navbar />
      <Routes>
          <Route path='/' index element={loading ? <div class="lds-hourglass"></div> : <Pokemons text={text} setText={setText} pokemons={FiltredPokes}/>}/>  
          <Route path='/detail/:id' element={<Detail/>}/>  
          <Route path='*' element={<Error/>} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;




