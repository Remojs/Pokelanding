import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true)

    const getPokemonInfo = async () => {
        const { data } = await axios.get(`https://gottafetchthemall.onrender.com/pokedex/number/${id}`);
        await setPokemon(data[0])
        setLoading(false)
    };

    useEffect(() => {
        getPokemonInfo();
    }, []);

return (
    <div className='detail-body'>
        {
        loading ? (<div class="lds-hourglass-detail"></div>) 
        : ( 
        <div className='container'> 
            <div className="detail-border">
              <div className="detail-box">
                <div className="imgbox">
                    <img src={pokemon?.image} alt={pokemon?.name} className='detail-img' style={(
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
                    {color:'#7B62A3'})}/>
                    <h2 className='info-name'> <span className="id">  {pokemon?.name} </span> - #{pokemon?.ID} </h2>
                </div>
                <div className="info-box">
                  <table>
                    <tbody>
                      <tr>
                        <td><span class="info"> Types: </span></td>
                        <td className='result'>{pokemon?.first_type} - {pokemon?.second_type}</td>
                      </tr>
    
                      <tr>
                        <td><span class="info"> Ability: </span></td>
                        <td className='result'>{pokemon?.ability}</td>
                      </tr>
    
                      <tr>
                        <td><span class="info"> Weight: </span></td>
                        <td className='result'>{pokemon?.weight}</td>
                      </tr>
    
                      <tr>
                        <td><span class="info"> Height: </span></td>
                        <td className='result'>{pokemon?.height}</td>
                      </tr>
                    </tbody>
                  </table>
                    <div className="stats-grid">
                        <h6 className='stat'>
                            HP:  <span className="span-detail-value">{pokemon.stats.hp}</span>
                        </h6>
                        <h6 className='stat'>
                            ATTACK:  <span className="span-detail-value">{pokemon.stats.attack}</span>
                        </h6>
                        <h6 className='stat'>
                            DEFENSE:  <span className="span-detail-value">{pokemon.stats.defense}</span>
                        </h6>
                        <h6 className='stat'>
                            SP. DEFENSE:  <span className="span-detail-value">{pokemon.stats.special_defense}</span>
                        </h6>
                        <h6 className='stat'>
                            SP. ATTACK:  <span className="span-detail-value">{pokemon.stats.special_attack}</span>
                        </h6>
                        <h6 className='stat'>
                            SPEED:  <span className="span-detail-value">{pokemon.stats.speed}</span>
                        </h6>
                    </div>
                </div>
              </div>
            </div>
            </div>
        // <div key={pokemon.name} className='detail-pk-box'>
        //     <img className='detail-pk-img' variant='top' src={pokemon.image}/>

        //     <div className='detail-pk-info'>
        //         <h1 className='detail-pk-name'> <span className='detail-pk-number'>#{pokemon.ID}</span> - {pokemon.name} </h1>
        //         <p className='detail-pk-typebox'>
        //             {pokemon.first_type && (<span className='detail-pk-typeo'>{pokemon.first_type} </span>)}
        //             {pokemon.second_type && (<span className='pk-typet'>{pokemon.second_type}</span>)}
        //         </p>
        //     </div>

        //     <div className='detail-pk-statsbox'>
        //         <div className="list-group-flush">

        //             <div className='detail-pk-stats'>
        //                 <div className='detail-pk-stat hp'>
        //                     <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                         HP: 
                                
        //                         <span className='detail-pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                             {pokemon.stats.hp} 
        //                         </span>
        //                     </p> 
        //                 </div>

        //                 <div className='detail-pk-stat at'>
        //                     <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                         ATK: 
                                
        //                         <span className='detail-pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                             {pokemon.stats.attack} 
        //                         </span>
        //                     </p> 
        //                 </div>
        //             </div>

        //             <div className='detail-pk-stats' >
        //                 <div className='detail-pk-stat df'>
        //                     <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                         DEF: 
                                
        //                         <span className='detail-pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                             {pokemon.stats.defense} 
        //                         </span>
        //                     </p> 
        //                 </div>

        //                 <div className='detail-pk-stat spa'>
        //                     <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                         SP.AT: 
                                
        //                         <span className='detail-pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                             {pokemon.stats.special_attack} 
        //                         </span>
        //                     </p> 
        //                 </div>
        //             </div>

        //             <div className='detail-pk-stats'>
        //                 <div className='detail-pk-stat spd'>
        //                     <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                         SP.DF: 
                                
        //                         <span className='detail-pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                             {pokemon.stats.special_defense} 
        //                         </span>
        //                     </p> 
        //                 </div>

        //                 <div className='detail-pk-stat sp'>
        //                     <p style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                         SPD: 
                                
        //                         <span className='detail-pk-statvalue' style={(pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                             {pokemon.stats.speed} 
        //                         </span>
        //                     </p> 
        //                 </div>
        //             </div>

        //             <div className='detail-pk-stats'>
        //                 <div> <span className='detail-pk-fstat' style={( pokemon.first_type === 'dark' ? {color:'white'} : {backgroundColor: ''})}>
        //                     Total=  {pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defense + pokemon.stats.special_attack + pokemon.stats.special_defense + pokemon.stats.speed} </span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        )}
    </div>
    )}

export default Detail