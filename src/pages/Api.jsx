import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Card, Button } from 'react-bootstrap';


const Api = () => {

    const [traerDatos, setTraerDatos] = useState([]);
    const [traerDato, setTraerDato] = useState([]);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character`)
        .then(res => res.json())
        .then(res => setTraerDatos(res.results))

        fetch(`https://rickandmortyapi.com/api/character?page=2`)
        .then(res => res.json())
        .then(res => setTraerDato(res.results))
    },[])

    const handleImprimir = () => {
        // const response = fetch('https://rickandmortyapi.com/api/character')
        // const data = response.json()
        console.log('Buenas tardes soy una funcion :/');
        console.log(traerDatos);


    }

    return (
    <>
        <div className='section m-5'>
            <hr />
            <h1> API PAGE </h1>
            <hr />
            <div onClick={handleImprimir} className="text-center m-4">
                <Button className='w-50 m-2 bg-danger'>
                    Imprimir
                </Button>
            </div>
        </div>
        <div>  
            <Row className='container m-5'>
                {
                traerDatos.map((i) => (
                    <Col key={i}>
                        <Card className='mb-5' style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={i.image} />
                            <Card.Body>
                                <Card.Title>{i.name}</Card.Title>
                                <Card.Text>
                                {i.location.name}
                                </Card.Text>
                            </Card.Body>
                        </Card >
                    </Col>
                ))}
                {
                traerDato.map((i) => (
                    <Col key={i}>
                        <Card className='mb-5' style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={i.image} />
                            <Card.Body>
                                <Card.Title>{i.name}</Card.Title>
                                <Card.Text>
                                {i.location.name}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    </>
    )
}

export default Api