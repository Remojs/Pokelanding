import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <NavLink to='/'
            className={({isActive}) => (isActive ? 'link active' : 'link')} > 
                Home 
            </NavLink>

            <NavLink 
            to='/about' 
            className={({isActive}) => (isActive ? 'link active' : 'link')} >
                About 
            </NavLink>

            <NavLink 
            to='/productos' 
            className={({isActive}) => (isActive ? 'link active' : 'link')} >
                Productos 
            </NavLink>

            <NavLink 
            to='/api' 
            className={({isActive}) => (isActive ? 'link active' : 'link')} >
                Api 
            </NavLink>

            <NavLink 
            to='/Formulario' 
            className={({isActive}) => (isActive ? 'link active' : 'link')} >
                Formulario 
            </NavLink>
        </div>
    )
}

export default Navbar