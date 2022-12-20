import React from 'react'

const Filtro = ({text, setText}) => {

    const handleInputChange = ({target}) => {
        setText(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(text)
    }

  return (
    <section>
        <form onSubmit={handleSubmit}>
            <div className="filter-box">
                <input  type='text' name='buscar' placeholder='Pokemon name...' className='filter' value={text} onChange={handleInputChange} />
                <button className='filter-button'> Buscar </button>
            </div>
        </form>
    </section>

  )
}

export default Filtro