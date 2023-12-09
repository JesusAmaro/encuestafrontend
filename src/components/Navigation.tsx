import React from 'react'
import { useAuthDispatch, useAuthState } from '../context/authContext'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Navigation = () => {
  
    const user = useAuthState();
    const authDispatch = useAuthDispatch();

    const logout = () => {
        authDispatch({
            type:'logout'
        })
    }
    
    return (
    <Navbar bg='light' expand='lg' className=''>
        <Container>
            <Navbar.Brand as={Link} to='/'>
                Encuesta
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar'></Navbar.Toggle>
            <Navbar.Collapse id='navbar'>
                <Nav className='me-auto'>
                </Nav>
                <Nav className='justify-content-end'>
                    { user.isAuthenticated ? 
                        <>
                            <Nav.Link as={Link} to='/createPoll'>Crear Encuesta</Nav.Link>
                            <NavDropdown title={user.email} id='navbar-dropdown'>
                                <NavDropdown.Item as={Link} to='/user'>
                                    Mis Encuestas
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                            </NavDropdown>
                        </>
                        :
                        <>
                            <Nav.Link as={Link} to='/'>Iniciar Sesión</Nav.Link>
                            <Nav.Link as={Link} to='/register'>Crear Cuenta</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation