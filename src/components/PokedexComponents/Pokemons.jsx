import React from 'react'
import Pokemon from './Pokemon'
import Filtro from './Filtro'
import { Row } from 'react-bootstrap';

const Pokemons = ({pokemons, text, setText}) => {

  if(pokemons.length === 0) return(
    <>
      <Filtro text={text} setText={setText} />
        <p> No hay un pokemon llamado "{text}" </p>
        <Row className='text-center abs-center'>
          {
            pokemons.map((pokemon) => (
              <Pokemon  key={pokemon.ID} pokemon={pokemon}/>
            ))}
        </Row>
    </>
  )

  return ( 
    <>
      <Filtro text={text} setText={setText} />

        <Row className='text-center abs-center'>
          {
            pokemons.map((pokemon) => (
              <Pokemon  key={pokemon.ID} pokemon={pokemon}/>
            ))}
        </Row>
    </>
    

  )
}

export default Pokemons