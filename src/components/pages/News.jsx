import React from 'react'
import { Card, Container, Row, Col }from 'react-bootstrap';

const News = () => {
  return (
    <> 
    <Container>
        <Row>
            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/watch-pokemon-tv/_tiles/2023/new-animated-series-169.png" />
                    <Card.Body>
                        <Card.Title>Llega una nueva serie de dibujos animados Pokémon en 2023</Card.Title>
                            <Card.Text> 16 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Celebra la trayectoria de Ash con una colección especial de episodios que cerrarán la serie Viajes Definitivos Pokémon.
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/llega-una-nueva-serie-de-dibujos-animados-pokemon-en-2023'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-go/12152022/02/pokemon-go-169.jpg" />
                    <Card.Body>
                        <Card.Title>Scatterbug, Spewpa y Vivillon llegan a Pokémon GO</Card.Title>
                            <Card.Text> 16 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Descubre cómo conseguir Vivillon con una variedad de motivos diferentes al guardar postales de tus amigos.
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/scatterbug-spewpa-y-vivillon-llegan-a-pokemon-go'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-go/12142022/pokemon-go-169.jpg" />
                    <Card.Body>
                        <Card.Title>El evento del Día de la Comunidad de diciembre trae Pokémon del Día de la Comunidad de 2021 y 2022</Card.Title>
                            <Card.Text> 14 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Pokémon ya conocidos, ataques destacados y bonus de evento harán del último Día de la Comunidad de 2022 todo un evento.
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/el-evento-del-dia-de-la-comunidad-de-diciembre-trae-pokemon-del-dia-de-la-comunidad-de-2021-y-2022'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-masters/12152022/pokemon-masters-ex-169.jpg" />
                    <Card.Body>
                        <Card.Title> Blanca y Sawsbuck llegan a Pokémon Masters EX </Card.Title>
                            <Card.Text> 15 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Blanca elige a Sawsbuck, el Pokémon Estacional, como compi en Pokémon Masters EX.
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/blanca-temporada-22-y-sawsbuck-llegan-a-pokemon-masters-ex'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-go/12152022/01/pokemon-go-169.jpg" />
                    <Card.Body>
                        <Card.Title>Todo tipo de maravillas invernales, en el evento Fiestas Invernales 2022 de Pokémon GO (1.ª Parte)</Card.Title>
                            <Card.Text> 15 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Los Pokémon de tipo Hielo reinan mientras un nuevo Pokémon megaevolucionado debuta en la primera parte de este evento de dos partes.
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/todo-tipo-de-maravillas-invernales-en-el-evento-fiestas-invernales-2022-de-pokemon-go-1-parte-'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/watch-pokemon-tv/_tiles/stunts/ashs-greatest-triumphs/ashs-greatest-triumphs-169-es.png" />
                    <Card.Body>
                        <Card.Title>Disfruta de los grandes triunfos de Ash en TV Pokémon</Card.Title>
                            <Card.Text> 16 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Ash deja su sitio como protagonista de la serie Pokémon, por lo que echamos la vista atrás con algunas de sus victorias más impresionantes.
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/disfruta-de-los-grandes-triunfos-de-ash-en-tv-pokemon'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/trading-card-game/_tiles/sv/announce/sv-announce-169-es.jpg" />
                    <Card.Body>
                        <Card.Title>La serie Escarlata y Púrpura de JCC Pokémon introduce cambios en el Juego de Cartas Coleccionables Pokémon</Card.Title>
                            <Card.Text> 9 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Descubre los cambios que llegarán a JCC Pokémon con la próxima serie Escarlata y Púrpura
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/la-serie-escarlata-y-purpura-de-jcc-pokemon-introduce-cambios-en-el-juego-de-cartas-coleccionables-pokemon'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/trading-card-game/_tiles/strategy/swsh12/triple-play/swsh12-triple-play-169-es.jpg" />
                    <Card.Body>
                        <Card.Title>Triple jugada de Espada y Escudo-Tempestad Plateada: Ho-Oh V, Chesnaught V y Wailord</Card.Title>
                            <Card.Text> 12 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        ¡Convierte las cartas de colección en divertidas barajas con las que jugar!
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/estrategia/triple-jugada-de-espada-y-escudo-tempestad-plateada-ho-oh-v-chesnaught-v-y-wailord'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col className='news-card'>
                <Card style={{ width: '18rem' }} className='news-body'>
                    <Card.Img variant="top" src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-masters/12132022/pokemon-masters-ex-169.jpg" />
                    <Card.Body>
                        <Card.Title>Yasmina y Ampharos llegan a Pokémon Masters EX</Card.Title>
                            <Card.Text> 13 de diciembre de 2022 </Card.Text>
                        <Card.Text>
                        Yasmina forma equipo con Ampharos, el Pokémon Luz, para iluminar Passio en Pokémon Masters EX.
                        </Card.Text>
                        <a type='button' href='https://www.pokemon.com/es/noticias-pokemon/yasmina-temporada-22-y-ampharos-llegan-a-pokemon-masters-ex'> Mas Informacion </a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default News