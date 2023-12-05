import { FC } from 'react'
import { usePollDispatch, usePollState } from '../../context/pollContext'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { QUESTION_TYPE_OPTIONS } from '../../utils/constants';
import Container from 'react-bootstrap/Container';
import Answer from './Answer';
import Button from 'react-bootstrap/Button';
import { PlusCircleFill, PlusLg, Trash } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip';


interface QuestionProps {
    index: number
}

const Question:FC<QuestionProps> = ({ index }) => {

    const poll = usePollState();
    const pollDispatch = usePollDispatch();

    const question = poll.questions[index];

    const errors: any = poll.errors;

    const errorKey = `questions[${index}]`;

    const renderAnswers = () => {
        return question.answers.map((answer, answerIndex) => {
            return <Answer key={answer.id} questionIndex={index} answerIndex={answerIndex} />
        })
    }


    return (
        <Card className='mt-3'>
            <Card.Body>
                <Row>
                    <Col sm='12' md='6' className='mb-4'>
                        <Form.Control 
                            type='text'
                            placeholder='Pregunta'
                            value={question.content}
                            onChange={(e) => pollDispatch({
                                type: 'questioncontent',
                                payload: {
                                    content: e.target.value,
                                    index: index
                                }
                            })}
                            isInvalid={!!errors[`${errorKey}.content`]}
                        /> 
                        <Form.Control.Feedback type='invalid'>
                            { errors[`${errorKey}.content`] }
                        </Form.Control.Feedback>
                    </Col>

                    <Col sm='12' md='6' className='mb-4'>
                        <Form.Control 
                            as='select'
                            className='form-select'
                            value={question.type}
                            onChange={(e) => pollDispatch({
                                type: 'changequestiontype',
                                payload: {
                                    index,
                                    value: e.target.value
                                }
                            })}
                            isInvalid={!!errors[`${errorKey}.type`]}
                        >
                            <option>Tipo de Pregunta</option>
                            { QUESTION_TYPE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.name}</option>) }
                        </Form.Control> 
                        <Form.Control.Feedback type='invalid'>
                            { errors[`${errorKey}.type`] }
                        </Form.Control.Feedback>
                    </Col>
                </Row>

                <Container>
                    { renderAnswers() }
                    <Button size='sm' className='mt-2' variant='outline-primary' onClick={(e) => pollDispatch({
                        type: 'newanswer',
                        index
                    })}>
                        <PlusLg /> Añadir Respuesta
                    </Button>
                </Container>
                <hr />

                <div className='d-flex justify-content-end'>
                    <span data-tooltip-id='tool-delete' data-tooltip-content='Añadir Pregunta'>
                        <PlusCircleFill className='option-question-icon ms-1' onClick={(e) => pollDispatch({
                            type: 'newquestion',
                            index
                        })}>
                        </PlusCircleFill>
                    </span>
                    <span data-tooltip-id='tool-delete' data-tooltip-content='Eliminar Pregunta'>
                        <Trash className='option-question-icon ms-1' onClick={(e) => pollDispatch({
                            type: 'removequestion',
                            questionId: question.id
                        })}>
                        </Trash>
                    </span>
                </div>

                <Tooltip place='left' id='tool-delete' />

            </Card.Body>
        </Card>
    )
}

export default Question