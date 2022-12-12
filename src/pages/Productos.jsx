import React from 'react'

const Productos = () => {
    const [name, setName] = React.useState([])

    React.useEffect(() => {
        getInfo()
    },[])

    const getInfo = async () =>{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=90`);
            const data = await response.json();
            const arr = Object.entries(data)
            const aa = arr[3][1]
            setName(aa)
    };

    let x = 0
    let indexer = () => {
        x++
    }

    return (
        <div className='section m-5'>
            Productos de calidad
            <div className="products container m-5">
                {name.map(i => (
                <div key={i} className="pBox ">
                    <div key={i} className="pName-Div">
                        <h1 key={i}> {i.name} </h1>
                        {indexer()}
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x}.png`} />
                    </div>
                </div>
            ))
                }
            </div>
        </div>
    )
}

export default Productos