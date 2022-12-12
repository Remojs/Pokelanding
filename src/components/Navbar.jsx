import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logo from '../logo.svg'

const Navbarr = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            REMO Bootstrap
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  )
}

export default Navbarr