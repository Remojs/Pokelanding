import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, ListGroup, Row, Col} from 'react-bootstrap';

const About = () => {


        const [pokemon, setPokemon] = useState([]);

        //api de mi data

        const URLlocal = 'http://localhost:3001/datos';
        const URL = 'https://backend-pwa-production.up.railway.app/datos'

        //Creamos una función para el useEffect
        const getPokemon = async () => {
          try {
              const { data } = await axios.get(URL);
              setPokemon(data.datos)
          } catch (error) {
            console.error(error);
          }
        }


        const handleInputChange = ({target}) => {
            console.log(target.value)
        }

        
        useEffect(() => {

          getPokemon()
        },[]);
    
    
    
        return (
          <>  
              <Row className='text-center abs-center'>
                
              {
                  pokemon.map(i => (
                  <Card key={i.name} className='pk-box' style={{ width: '18rem' }}>
                      <Card.Img className='pk-img' variant="top" src={i.image} style={(
                              i.first_type === 'normal' ? {backgroundColor:'#A4ACAF'} :
                              i.first_type === 'grass' ? {backgroundColor:'#8ed119'} :
                              i.first_type === 'fire' ? {backgroundColor:'#FD7D24'} :
                              i.first_type === 'water' ? {backgroundColor:'#3DC7EF'} :
                              i.first_type === 'flying' ? {backgroundColor:'#4592C4'} :
                              i.first_type === 'bug' ? {backgroundColor:'#98b33a'} :
                              i.first_type === 'poison' ? {backgroundColor:'#B97FC9'} :
                              i.first_type === 'electric' ? {backgroundColor:'#EED535'} :
                              i.first_type === 'rock' ? {backgroundColor:'#A38C21'} :
                              i.first_type === 'ice' ? {backgroundColor:'#51C4E7'} :
                              i.first_type === 'psychic' ? {backgroundColor:'#F366B9'} :
                              i.first_type === 'ground' ? {backgroundColor:'#AB9842'} :
                              i.first_type === 'dragon' ? {backgroundColor:'#707070'} :
                              i.first_type === 'fighting' ? {backgroundColor:'#F16E57'} :
                              i.first_type === 'steel' ? {backgroundColor:'#9EB7B8'} :
                              i.first_type === 'fairy' ? {backgroundColor:'#FDB9E9'} :
                              i.first_type === 'dark' ? {backgroundColor:'#032441'} :
                              i.first_type === 'ghost' ? {backgroundColor:'#7B62A3'} :
                              {color:'#7B62A3'})} />
                      <Card.Body className='pk-info'>
                          <Card.Title className='pk-name'><span className='pk-number'>#{i.ID}</span> - <a onClick={handleInputChange}> {i.name} </a>  </Card.Title>
                          <Card.Text className='pk-typebox'>
                              <span className='pk-typeo' 
                              style={(
                              i.first_type === 'normal' ? {backgroundColor:'#A4ACAF'} :
                              i.first_type === 'grass' ? {backgroundColor:'#8ed119'} :
                              i.first_type === 'fire' ? {backgroundColor:'#FD7D24'} :
                              i.first_type === 'water' ? {backgroundColor:'#3DC7EF'} :
                              i.first_type === 'flying' ? {backgroundColor:'#4592C4'} :
                              i.first_type === 'bug' ? {backgroundColor:'#98b33a'} :
                              i.first_type === 'poison' ? {backgroundColor:'#B97FC9'} :
                              i.first_type === 'electric' ? {backgroundColor:'#EED535'} :
                              i.first_type === 'rock' ? {backgroundColor:'#A38C21'} :
                              i.first_type === 'ice' ? {backgroundColor:'#51C4E7'} :
                              i.first_type === 'psychic' ? {backgroundColor:'#F366B9'} :
                              i.first_type === 'ground' ? {backgroundColor:'#AB9842'} :
                              i.first_type === 'dragon' ? {backgroundColor:'#707070'} :
                              i.first_type === 'fighting' ? {backgroundColor:'#F16E57'} :
                              i.first_type === 'steel' ? {backgroundColor:'#9EB7B8'} :
                              i.first_type === 'fairy' ? {backgroundColor:'#FDB9E9'} :
                              i.first_type === 'dark' ? {backgroundColor:'#032441'} :
                              i.first_type === 'ghost' ? {backgroundColor:'#7B62A3'} :
                              {color:'#7B62A3'})}>
                                  {i.first_type}  
                              </span>
                              &#160;
                              <span className='pk-typet' 
                              style={(
                              i.second_type === 'normal' ? {backgroundColor:'#A4ACAF'} :
                              i.second_type === 'grass' ? {backgroundColor:'#8ed119'} :
                              i.second_type === 'fire' ? {backgroundColor:'#FD7D24'} :
                              i.second_type === 'water' ? {backgroundColor:'#3DC7EF'} :
                              i.second_type === 'flying' ? {backgroundColor:'#4592C4'} :
                              i.second_type === 'bug' ? {backgroundColor:'#98b33a'} :
                              i.second_type === 'poison' ? {backgroundColor:'#B97FC9'} :
                              i.second_type === 'electric' ? {backgroundColor:'#EED535'} :
                              i.second_type === 'rock' ? {backgroundColor:'#A38C21'} :
                              i.second_type === 'ice' ? {backgroundColor:'#51C4E7'} :
                              i.second_type === 'psychic' ? {backgroundColor:'#F366B9'} :
                              i.second_type === 'ground' ? {backgroundColor:'#AB9842'} :
                              i.second_type === 'dragon' ? {backgroundColor:'#707070'} :
                              i.second_type === 'fighting' ? {backgroundColor:'#F16E57'} :
                              i.second_type === 'steel' ? {backgroundColor:'#9EB7B8'} :
                              i.second_type === 'fairy' ? {backgroundColor:'#FDB9E9'} :
                              i.second_type === 'dark' ? {backgroundColor:'#032441'} :
                              i.second_type === 'ghost' ? {backgroundColor:'#7B62A3'} :
                              {color:'#7B62A3'})}>
                              {i.second_type}
                              </span>
                          </Card.Text>
                      </Card.Body>
                      <div className='pk-statsbox' style={(
                              i.first_type === 'normal' ? {backgroundColor:'#A4ACAF'} :
                              i.first_type === 'grass' ? {backgroundColor:'#8ed119'} :
                              i.first_type === 'fire' ? {backgroundColor:'#FD7D24'} :
                              i.first_type === 'water' ? {backgroundColor:'#3DC7EF'} :
                              i.first_type === 'flying' ? {backgroundColor:'#4592C4'} :
                              i.first_type === 'bug' ? {backgroundColor:'#98b33a'} :
                              i.first_type === 'poison' ? {backgroundColor:'#B97FC9'} :
                              i.first_type === 'electric' ? {backgroundColor:'#EED535'} :
                              i.first_type === 'rock' ? {backgroundColor:'#A38C21'} :
                              i.first_type === 'ice' ? {backgroundColor:'#51C4E7'} :
                              i.first_type === 'psychic' ? {backgroundColor:'#F366B9'} :
                              i.first_type === 'ground' ? {backgroundColor:'#AB9842'} :
                              i.first_type === 'dragon' ? {backgroundColor:'#707070'} :
                              i.first_type === 'fighting' ? {backgroundColor:'#F16E57'} :
                              i.first_type === 'steel' ? {backgroundColor:'#9EB7B8'} :
                              i.first_type === 'fairy' ? {backgroundColor:'#FDB9E9'} :
                              i.first_type === 'dark' ? {backgroundColor:'#032441', color: 'white'} :
                              i.first_type === 'ghost' ? {backgroundColor:'#7B62A3'} :
                              {color:'#7B62A3'})}>
                          <ListGroup className="list-group-flush">
                              <Row className='pk-stats'>
                                  <Col className='pk-stat hp'> <p> HP: <span className='pk-statvalue' style={( i.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                                      {i.stats.hp} </span></p> 
                                  </Col>
      
                                  <Col className='pk-stat at'> <p> ATTACK: <span className='pk-statvalue' style={( i.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                                      {i.stats.attack} </span></p> 
                                  </Col>
                              </Row>
                              <Row className='pk-stats' >
                                  <Col className='pk-stat df'> <p> DEFENSE: <span className='pk-statvalue' style={( i.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                                      {i.stats.defense} </span></p> 
                                  </Col>
      
                                  <Col className='pk-stat spa'> <p> SP.ATK: <span className='pk-statvalue' style={( i.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                                      {i.stats.special_attack} </span></p> 
                                  </Col>
                              </Row>
                              <Row className='pk-stats'>
                                  <Col className='pk-stat spd'> <p> SP.DEF: <span className='pk-statvalue' style={( i.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                                      {i.stats.special_defense} </span></p> 
                                  </Col>
      
                                  <Col className='pk-stat sp'> <p> SPEED: <span className='pk-statvalue' style={( i.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                                      {i.stats.speed} </span></p> 
                                  </Col>
                              </Row>
                              <Row className='pk-stats'>
                                  <Col> <span className='pk-fstat' style={( i.first_type === 'dark' ? {color:'black'} : {backgroundColor: ''})}>
                                      Total Stats=  {i.stats.hp + i.stats.attack + i.stats.defense + i.stats.special_attack + i.stats.special_defense + i.stats.speed} </span></Col>
                              </Row>
                          </ListGroup>
                      </div>
                  </Card>
                  ))
              }
              </Row>
          </>
        )
}

export default About
