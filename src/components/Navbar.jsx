import React from 'react'
import {Nav, Navbar} from 'react-bootstrap';

const Navbarr = () => {
  return (
    <Nav className='bg-light'>
      <Navbar.Brand className='logo'>REMOCODE</Navbar.Brand>
      <Nav.Item>
        <Nav.Link href="/" className={({isActive}) => (isActive ? 'link active' : 'link')}> HOME </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/news" className={({isActive}) => (isActive ? 'link active' : 'link')}> News </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/form" className={({isActive}) => (isActive ? 'link active' : 'link')}> Form </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/table" className={({isActive}) => (isActive ? 'link active' : 'link')}> Table </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://backend-pwa-production-82ba.up.railway.app/personas" className={({isActive}) => (isActive ? 'link active' : 'link')}> Entries </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://backend-pwa-production-82ba.up.railway.app/datos" className={({isActive}) => (isActive ? 'link active' : 'link')}> Pokemons </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
export default Navbarr