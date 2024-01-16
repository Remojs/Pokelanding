// import dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'

//import components
import Error from './components/Error'
import Pokemons from './components/PokedexComponents/Pokemons';
import Detail from './components/Detail/Detail';

function App() {
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [text, setText] = useState('')
  const [min, setMin] = useState(51)
  const [max, setMax] = useState(100)


  useEffect(() => {
    const getPokemon = async () => {
      const { data } = await axios.get(
        `https://gottafetchthemall.onrender.com/pokedex/between?min=1&max=50`
      );
      setPokemons(data);
      setLoading(false);
    };
    getPokemon();
  }, []);

  const loadMore = async () => {
    setMin((prevMin) => prevMin + 50);
    setMax((prevMax) => prevMax + 50);
    const { data } = await axios.get(
      `https://gottafetchthemall.onrender.com/pokedex/between?min=${min}&max=${max}`
    );
    setPokemons([...pokemons, ...data]);
  };

// variable de pokemon filtrados
const FiltredPokes = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(text.toLowerCase()))


  return (
    <BrowserRouter>

      <Routes>
          <Route path='/' index element={loading ? <div class="lds-hourglass"></div> : <Pokemons 
          text={text} 
          setText={setText} 
          pokemons={FiltredPokes}
          loadMore={loadMore}
          />}/>  
          <Route path='/detail/:id' element={<Detail/>}/>  
          <Route path='*' element={<Error/>} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;




