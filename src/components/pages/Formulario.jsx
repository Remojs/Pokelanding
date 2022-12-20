import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'


const Formulario = () => {
    //api de la database
    const URL = 'https://backend-pwa-production-82ba.up.railway.app/crear'
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
          <h2>
              Formulario de compra
          </h2>
          <Form>

              {Object.keys(inputs).map((key, index) => (
              <Form.Group className="mb-3" key={index}>
                  <Form.Label id="form">
                      {key}
                  </Form.Label>
                  <Form.Control 
                      name={key}
                      value={inputs[key]}
                      onChange={handleChange}
                  />
              </Form.Group>
              ))}

              <div className="text-center w-100">
                  <Button variant="primary" type="button" onClick={handleClick}>
                      ENVIAR
                  </Button>
              </div>
          </Form>
      </div>
    )
}

export default Formulario