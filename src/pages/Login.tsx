import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Spinner } from 'react-bootstrap'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [sendingData, setSendingData] = useState(false);

    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try{
            setSendingData(true);
            cleanAll();
        }catch(error: any){
            console.log(error);
            //setError(error.response.data.error);
            setSendingData(false);
        }
        console.log(email + " " + password);
    }

    const cleanAll = () => {
        setPassword("");
        setEmail("");
        setError("");
        setSendingData(false);
    }

    return (
        <Container>
            <Row>
                <Col lg="5" md="10" sm="10" className='mx-auto'>
                    <Card className='mt-5'>
                        <Card.Body>
                            <h4>Iniciar Sesión</h4>
                            <Form onSubmit={login}>
                                <Form.Group className='mb-3' controlId='email'>
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type='email' placeholder='e.g. mario.benedetti@mail.com' 
                                                  value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='password'>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type='text' placeholder='********'
                                                  value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button type='submit'>
                                    { sendingData ? <>
                                        <Spinner animation='border' as='span' size='sm' role='status' aria-hidden='true'></Spinner>
                                        &nbsp;
                                        <span>Iniciando...</span>
                                    </>:
                                    <>Iniciar Sesión</>
                                    }
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login