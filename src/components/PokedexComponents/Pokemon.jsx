import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

const typeColors = { normal: '#A4ACAF', grass: '#8ed119', fire: '#FD7D24', water: '#3DC7EF', flying: '#4592C4', bug: '#98b33a', poison: '#B97FC9', electric: '#EED535', rock: '#A38C21', ice: '#51C4E7', psychic: '#F366B9', ground: '#AB9842', dragon: '#0068ff', fighting: '#e34428', steel: '#9EB7B8', fairy: '#FDB9E9', dark: '#032441', ghost: '#7B62A3',};

const getTypeStyle = (type) => ({
    backgroundColor: typeColors[type] || '#7B62A3',
    color: type === 'dark' ? 'white' : 'black',
});

const getPokemonImageStyle = (type) => ({
    background: `linear-gradient(360deg, rgba(2,0,36,1) 0%, ${typeColors[type] || '#7B62A3'} 0%)`,
});


const Pokemon = ({ pokemon }) => {
    return (
        <Card key={pokemon.name} className='pk-box' style={{ width: '18rem' }}>
            <Card.Img className='pk-img' variant='top' src={pokemon.image} style={getPokemonImageStyle(pokemon.first_type)}/>

            <Card.Body className='pk-info'>
                <Card.Title className='pk-name'> <span className='pk-number'>#{pokemon.ID}</span> - <a href={`/detail/${pokemon.ID}`} className="pokelink">{pokemon.name}</a> </Card.Title>
                <Card.Text className='pk-typebox'>
                    {pokemon.first_type && (<span className='pk-typeo' style={getTypeStyle(pokemon.first_type)}>{pokemon.first_type} </span>)}
                    {pokemon.second_type && (<span className='pk-typet' style={getTypeStyle(pokemon.second_type)}>{pokemon.second_type}</span>)}
                </Card.Text>
            </Card.Body>

            <div className='pk-statsbox' style={getPokemonImageStyle(pokemon.first_type)}>
                <ListGroup className="list-group-flush">

                    <Row className='pk-stats'>
                        <Col className='pk-stat hp'>
                            <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                HP: 
                                
                                <span className='pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                    {pokemon.stats.hp} 
                                </span>
                            </p> 
                        </Col>

                        <Col className='pk-stat at'>
                            <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                ATK: 
                                
                                <span className='pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                    {pokemon.stats.attack} 
                                </span>
                            </p> 
                        </Col>
                    </Row>

                    <Row className='pk-stats' >
                        <Col className='pk-stat df'>
                            <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                DEF: 
                                
                                <span className='pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                    {pokemon.stats.defense} 
                                </span>
                            </p> 
                        </Col>

                        <Col className='pk-stat spa'>
                            <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                SP.AT: 
                                
                                <span className='pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                    {pokemon.stats.special_attack} 
                                </span>
                            </p> 
                        </Col>
                    </Row>

                    <Row className='pk-stats'>
                        <Col className='pk-stat spd'>
                            <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                SP.DF: 
                                
                                <span className='pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                    {pokemon.stats.special_defense} 
                                </span>
                            </p> 
                        </Col>

                        <Col className='pk-stat sp'>
                            <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                SPD: 
                                
                                <span className='pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                                    {pokemon.stats.speed} 
                                </span>
                            </p> 
                        </Col>
                    </Row>

                    <Row className='pk-stats'>
                        <Col> <span className='pk-fstat' style={( pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
                            Total=  {pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defense + pokemon.stats.special_attack + pokemon.stats.special_defense + pokemon.stats.speed} </span>
                        </Col>
                    </Row>
                </ListGroup>
            </div>
    </Card>
)}

export default Pokemon