import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { loginUser, registerUser } from '../services/UserService'
import { Spinner } from 'react-bootstrap'
import { useAuthDispatch } from '../context/authContext'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [sendingData, setSendingData] = useState(false);

    const authDispatch = useAuthDispatch();

    const register = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try{
            setSendingData(true);
            await registerUser(name, email, password);
            const res = await loginUser(email, password);
            const token = res?.data.token;
            authDispatch({
                type: 'login',
                token: token
            })
            cleanAll();
            
        }catch(error: any){
            //console.log(error.response.data.errors);
            setErrors(error.response.data.errors);
            setSendingData(false);
            //console.log(!errors?.name);
        }
    }

    const cleanAll = () => {
        setName("");
        setPassword("");
        setEmail("");
        setErrors({});
        setSendingData(false);
    }

    return (
        <Container>
            <Row>
                <Col lg="5" md="10" sm="10" className='mx-auto'>
                    <Card className='mt-5'>
                        <Card.Body>
                            <h4>Crear Cuenta</h4>
                            <Form onSubmit={register}>
                                <Form.Group className='mb-3' controlId='name'>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type='text' placeholder='e.g. Mario Benedetti' required
                                                  isInvalid={!!errors.name} value={name} onChange={e => setName(e.target.value)}></Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        { errors?.name }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='email'>
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type='email' placeholder='e.g. mario.benedetti@mail.com' required
                                                  isInvalid={!!errors.email}  value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                                    <Form.Control.Feedback type='invalid'>{errors?.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='password'>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type='password' placeholder='********' required
                                                  isInvalid={!!errors.password} value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                                    <Form.Control.Feedback type='invalid'>{errors?.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Button type='submit'>
                                    { sendingData ? <>
                                        <Spinner animation='border' as='span' size='sm' role='status' aria-hidden='true'></Spinner>
                                        &nbsp;
                                        <span>Creando Cuenta...</span>
                                    </>:
                                    <>Crear Cuenta</>
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

export default Register