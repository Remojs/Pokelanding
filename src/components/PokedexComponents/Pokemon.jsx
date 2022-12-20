import React from 'react'
import { Card, ListGroup, Row, Col} from 'react-bootstrap';

const Pokemon = ({pokemon}) => {

    const anchor = 'https://www.pokemon.com/es/pokedex/'

return (
        <Card key={pokemon.name} className='pk-box' style={{ width: '18rem' }}>
            <a href={anchor + pokemon.name} className='anchor'>
                <Card.Img className='pk-img' variant="top" src={pokemon.image} style={(
                    pokemon.first_type === 'normal' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(138,140,140,1) 0%, rgba(164,172,175,1) 100%)'} :
                    pokemon.first_type === 'grass' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(100,153,6,1) 0%, rgba(142,209,25,1) 100%)'} :
                    pokemon.first_type === 'fire' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(201,54,0,1) 0%, rgba(253,125,36,1) 100%)'} :
                    pokemon.first_type === 'water' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(9,132,164,1) 0%, rgba(0,212,255,1) 100%)'} :
                    pokemon.first_type === 'flying' ? { background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(117,196,247,1) 0%, rgba(69,146,196,1) 100%)'} :
                    pokemon.first_type === 'bug' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(104,125,31,1) 0%, rgba(152,179,58,1) 100%)'} :
                    pokemon.first_type === 'poison' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(186,57,222,1) 0%, rgba(185,127,201,1) 100%)'} :
                    pokemon.first_type === 'electric' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(182,170,25,1) 0%, rgba(255,221,0,1) 100%)'} :
                    pokemon.first_type === 'rock' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(103,87,13,1) 0%, rgba(145,125,29,1) 100%)'} :
                    pokemon.first_type === 'ice' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(64,155,182,1) 0%, rgba(81,196,231,1) 100%)'} :
                    pokemon.first_type === 'psychic' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(244,45,162,1) 0%, rgba(243,102,185,1) 100%)'} :
                    pokemon.first_type === 'ground' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(115,102,44,1) 0%, rgba(171,152,66,1) 100%)'} :
                    pokemon.first_type === 'dragon' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(13,72,158,1) 0%, rgba(0,104,255,1) 100%)'} :
                    pokemon.first_type === 'fighting' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(255,38,0,1) 0%, rgba(227,68,40,1) 100%)'} :
                    pokemon.first_type === 'steel' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(114,131,131,1) 0%, rgba(158,183,184,1) 100%)'} :
                    pokemon.first_type === 'fairy' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(180,129,165,1) 0%, rgba(253,185,233,1) 100%)'} :
                    pokemon.first_type === 'dark' ? {background: 'linear-gradient(150deg, rgba(0,0,0,1) 0%, rgba(3,36,65,1) 0%, rgba(13,53,89,1) 87%)'} :
                    pokemon.first_type === 'ghost' ? {background: 'linear-gradient(150deg, rgba(2,0,36,1) 0%, rgba(76,65,92,1) 0%, rgba(123,98,163,1) 100%)'} :
                    {color:'#7B62A3'})} />
            <Card.Body className='pk-info'>
                <Card.Title className='pk-name'><span className='pk-number'>#{pokemon.ID}</span> - {pokemon.name}</Card.Title>
                <Card.Text className='pk-typebox'>
                    <span className='pk-typeo' 
                    style={(
                    pokemon.first_type === 'normal' ? {backgroundColor:'#A4ACAF'} :
                    pokemon.first_type === 'grass' ? {backgroundColor:'#8ed119'} :
                    pokemon.first_type === 'fire' ? {backgroundColor:'#FD7D24'} :
                    pokemon.first_type === 'water' ? {backgroundColor:'#3DC7EF'} :
                    pokemon.first_type === 'flying' ? {backgroundColor:'#4592C4'} :
                    pokemon.first_type === 'bug' ? {backgroundColor:'#98b33a'} :
                    pokemon.first_type === 'poison' ? {backgroundColor:'#B97FC9'} :
                    pokemon.first_type === 'electric' ? {backgroundColor:'#EED535'} :
                    pokemon.first_type === 'rock' ? {backgroundColor:'#A38C21'} :
                    pokemon.first_type === 'ice' ? {backgroundColor:'#51C4E7'} :
                    pokemon.first_type === 'psychic' ? {backgroundColor:'#F366B9'} :
                    pokemon.first_type === 'ground' ? {backgroundColor:'#AB9842'} :
                    pokemon.first_type === 'dragon' ? {backgroundColor:'#0068ff'} :
                    pokemon.first_type === 'fighting' ? {backgroundColor:'#e34428'} :
                    pokemon.first_type === 'steel' ? {backgroundColor:'#9EB7B8'} :
                    pokemon.first_type === 'fairy' ? {backgroundColor:'#FDB9E9'} :
                    pokemon.first_type === 'dark' ? {backgroundColor:'#032441'} :
                    pokemon.first_type === 'ghost' ? {backgroundColor:'#7B62A3'} :
                    {color:'#7B62A3'})}>
                        {pokemon.first_type}  
                    </span>
                    &#160;
                    <span className='pk-typet' 
                    style={(
                    pokemon.second_type === 'normal' ? {backgroundColor:'#A4ACAF'} :
                    pokemon.second_type === 'grass' ? {backgroundColor:'#8ed119'} :
                    pokemon.second_type === 'fire' ? {backgroundColor:'#FD7D24'} :
                    pokemon.second_type === 'water' ? {backgroundColor:'#3DC7EF'} :
                    pokemon.second_type === 'flying' ? {backgroundColor:'#4592C4'} :
                    pokemon.second_type === 'bug' ? {backgroundColor:'#98b33a'} :
                    pokemon.second_type === 'poison' ? {backgroundColor:'#B97FC9'} :
                    pokemon.second_type === 'electric' ? {backgroundColor:'#EED535'} :
                    pokemon.second_type === 'rock' ? {backgroundColor:'#A38C21'} :
                    pokemon.second_type === 'ice' ? {backgroundColor:'#51C4E7'} :
                    pokemon.second_type === 'psychic' ? {backgroundColor:'#F366B9'} :
                    pokemon.second_type === 'ground' ? {backgroundColor:'#AB9842'} :
                    pokemon.second_type === 'dragon' ? {backgroundColor:'#0068ff'} :
                    pokemon.second_type === 'fighting' ? {backgroundColor:'#e34428'} :
                    pokemon.second_type === 'steel' ? {backgroundColor:'#9EB7B8'} :
                    pokemon.second_type === 'fairy' ? {backgroundColor:'#FDB9E9'} :
                    pokemon.second_type === 'dark' ? {backgroundColor:'#032441'} :
                    pokemon.second_type === 'ghost' ? {backgroundColor:'#7B62A3'} :
                    {color:'#7B62A3'})}>
                    {pokemon.second_type}
                    </span>
                </Card.Text>
            </Card.Body>
            <div className='pk-statsbox' style={(
                    pokemon.first_type === 'normal' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(138,140,140,1) 0%, rgba(164,172,175,1) 100%)'} :
                    pokemon.first_type === 'grass' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(100,153,6,1) 0%, rgba(142,209,25,1) 100%)'} :
                    pokemon.first_type === 'fire' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(201,54,0,1) 0%, rgba(253,125,36,1) 100%)'} :
                    pokemon.first_type === 'water' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(9,132,164,1) 0%, rgba(0,212,255,1) 100%)'} :
                    pokemon.first_type === 'flying' ? { background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(117,196,247,1) 0%, rgba(69,146,196,1) 100%)'} :
                    pokemon.first_type === 'bug' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(104,125,31,1) 0%, rgba(152,179,58,1) 100%)'} :
                    pokemon.first_type === 'poison' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(186,57,222,1) 0%, rgba(185,127,201,1) 100%)'} :
                    pokemon.first_type === 'electric' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(182,170,25,1) 0%, rgba(255,221,0,1) 100%)'} :
                    pokemon.first_type === 'rock' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(103,87,13,1) 0%, rgba(145,125,29,1) 100%)'} :
                    pokemon.first_type === 'ice' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(64,155,182,1) 0%, rgba(81,196,231,1) 100%)'} :
                    pokemon.first_type === 'psychic' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(244,45,162,1) 0%, rgba(243,102,185,1) 100%)'} :
                    pokemon.first_type === 'ground' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(115,102,44,1) 0%, rgba(171,152,66,1) 100%)'} :
                    pokemon.first_type === 'dragon' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(13,72,158,1) 0%, rgba(0,104,255,1) 100%)'} :
                    pokemon.first_type === 'fighting' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(255,38,0,1) 0%, rgba(227,68,40,1) 100%)'} :
                    pokemon.first_type === 'steel' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(114,131,131,1) 0%, rgba(158,183,184,1) 100%)'} :
                    pokemon.first_type === 'fairy' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(180,129,165,1) 0%, rgba(253,185,233,1) 100%)'} :
                    pokemon.first_type === 'dark' ? {background: 'linear-gradient(360deg, rgba(0,0,0,1) 0%, rgba(3,36,65,1) 0%, rgba(13,53,89,1) 87%)', color: 'white'} :
                    pokemon.first_type === 'ghost' ? {background: 'linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(76,65,92,1) 0%, rgba(123,98,163,1) 100%)'} :
                    {color:'#7B62A3'})}>
                <ListGroup className="list-group-flush">
                    <Row className='pk-stats'>
                        <Col className='pk-stat hp'> <p> HP: <span className='pk-statvalue' style={( pokemon.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                            {pokemon.stats.hp} </span></p> 
                        </Col>

                        <Col className='pk-stat at'> <p> ATTACK: <span className='pk-statvalue' style={( pokemon.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                            {pokemon.stats.attack} </span></p> 
                        </Col>
                    </Row>
                    <Row className='pk-stats' >
                        <Col className='pk-stat df'> <p> DEFENSE: <span className='pk-statvalue' style={( pokemon.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                            {pokemon.stats.defense} </span></p> 
                        </Col>

                        <Col className='pk-stat spa'> <p> SP.ATK: <span className='pk-statvalue' style={( pokemon.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                            {pokemon.stats.special_attack} </span></p> 
                        </Col>
                    </Row>
                    <Row className='pk-stats'>
                        <Col className='pk-stat spd'> <p> SP.DEF: <span className='pk-statvalue' style={( pokemon.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                            {pokemon.stats.special_defense} </span></p> 
                        </Col>

                        <Col className='pk-stat sp'> <p> SPEED: <span className='pk-statvalue' style={( pokemon.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                            {pokemon.stats.speed} </span></p> 
                        </Col>
                    </Row>
                    <Row className='pk-stats'>
                        <Col> <span className='pk-fstat' style={( pokemon.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                            Total Stats=  {pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defense + pokemon.stats.special_attack + pokemon.stats.special_defense + pokemon.stats.speed} </span></Col>
                    </Row>
                </ListGroup>
            </div>
        </a>
    </Card>
        )
}

export default Pokemon