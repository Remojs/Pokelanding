import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'


const Formulario = () => {
    //api de la database
    const URLlocal = 'http://localhost:3001/crear'
    const URL = 'https://backend-pwa-production.up.railway.app/crear'
    //inicializamos variables vacias para el useState
    const [inputs, setInputs] = useState({
        nombre: "",
        apellido: "",
        dni: ""
    });

    //funcion para setear las variables
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    //Funcion del post:
    const handleClick = async() => {

        console.log(inputs)

        await axios.post(URL, inputs) //enviamos datos
        setInputs({ //limpiamos los inputs
            nombre: "",
            apellido: "",
            dni: ""
        })
    }

    return (
        <div className='section m-5'>
        <Form>

            {Object.keys(inputs).map((key, index) => (
                <Form.Group className="m-3" controlId="formBasicEmail">
                <Form.Label id='form'> 
                    {key}
                </Form.Label>
                <Form.Control 
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                />
            </Form.Group>
            ))}

            <div className='text-center w-100'>
                <Button variant="primary" type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </div>
        </Form>
        </div>
    )
}

export default Formulario