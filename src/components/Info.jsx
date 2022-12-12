import React from 'react'

const Info = ({poke, setPoke}) => {

    

    const handleInputChange = ({target}) => {
        setPoke(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(poke)
    }

  return (
    <section>
        <form onSubmit={handleSubmit}>
            <input type='text' name='buscar' placeholder='Nombre del Pokemon' value={poke} onChange={handleInputChange} />
            <button type='submit'> Buscar </button>
        </form>
    </section>
  )
}

export default Info