import { FC, useEffect, useState } from 'react'
import { createPollReply, getPollWithQuestions } from '../../services/PollService';
import { Question, UserAnswer, PollReplyDetail } from '../../types';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReplyQuestion from './ReplyQuestion';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Check2Circle } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';

interface PollProps {
    id: string
}

const Poll:FC<PollProps> = ({ id }) => {

    const [poll, setPoll] = useState<any>(null);
    const [user, setUser] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [userAnswers, setUserAnswers] = useState<any>({});
    const [isPollAnswered, setIsPollAnswered] = useState(false);
    const [sendingData, setSendingData] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        fetchPoll();
    }, []);

    const fetchPoll = async () => {
        try{
            const res: any = await getPollWithQuestions(id);
            const data = res.data;

            data.questions = data.questions.sort((a: Question, b: Question) => a.questionOrder - b.questionOrder);
            setPoll(data);
        } catch (error: any) {
            console.log(error.response.data);
            if(error.response.status === 500){
                history.replace('/');
            }
            
        }
    }

    const handleQuestionChange = (userAnswer: UserAnswer) => {
        const answers = { ...userAnswers };
        switch(userAnswer.type){
            case 'RADIO':
            case 'SELECT': {
                answers[userAnswer.questionId] = { questionId: userAnswer.questionId, answerId: userAnswer.answer };
                break;
            }
            case 'CHECKBOX': {
                if(answers[userAnswer.questionId]){
                    const arr = answers[userAnswer.questionId].answers;
                    const index = arr.indexOf(userAnswer.answer);
                    if(index === -1){
                        arr.push(userAnswer.answer);
                    } else {
                        arr.length < 2 ? delete answers[userAnswer.questionId] : arr.splice(index, 1);
                    }
                } else {
                    answers[userAnswer.questionId] = { questionId: userAnswer.questionId, answers: [userAnswer.answer] }
                }
                break;
            }
        }
        setUserAnswers(answers);
    }

    const renderQuestions = () => {
        return poll.questions.map((question: Question) => <ReplyQuestion 
                changeCallback={handleQuestionChange} 
                question={question} 
                key={question.id} />);
    }

    const prepareForm = () => {
        setErrors({});

        if(Object.keys(userAnswers).length !== poll.questions.length){
            setErrors((current:any) => {
                return { ...current, allQuestionsAnswered: "Por favor responda todas las encuestas" }
            });
            return;
        }

        let replies: PollReplyDetail[] = [];

        for( let key in userAnswers ) {
            if(userAnswers[key].answers) {
                userAnswers[key].answers.forEach((id: number) => replies.push({ 
                    questionId: userAnswers[key].questionId, answerId: id
                }));
            } else {
                replies.push(userAnswers[key]);
            }
        }

        sendForm(replies);

    }

    const sendForm = async (replies: PollReplyDetail[]) => {
        try {
            setSendingData(true);
            await createPollReply({
                pollReplies: replies,
                poll: poll.id,
                user: user
            })
            setSendingData(false);
            setIsPollAnswered(true);
        } catch (error: any) {
            if(error.response){
                error.response.status === 400 && setErrors(error.response.data.errors);
            }
            setSendingData(false);
        }
    }

    return (
        <Container>
            <Row>
                <Col sm='10' md='10' lg='8' className='mx-auto mt-5 mb-5'>
                    {
                        isPollAnswered &&
                        <div className='d-flex align-items-center flex-column poll-answered-container'>
                            <Check2Circle className='success-icon'></Check2Circle>
                            <Alert show={isPollAnswered} variant='success'>
                                Gracias por tu Respuesta!!
                            </Alert>
                        </div>
                    }
                    
                    {
                        poll && !isPollAnswered && <>
                            <h2>{ poll.content }</h2><hr/>
                            <Form.Group className='mb-3' controlId='user'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control 
                                        value={user} onChange={(e) => setUser(e.target.value)} 
                                        type='text' 
                                        placeholder='Ingresa tu nombre' 
                                        isInvalid={!!errors.user}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.user}</Form.Control.Feedback>
                            </Form.Group>
                            <div>
                                { renderQuestions() }
                            </div>

                            <Button onClick={prepareForm} type='submit'>
                                { sendingData ? <>
                                        <Spinner animation='border' as='span' size='sm' role='status' aria-hidden='true'></Spinner>
                                        &nbsp;
                                        <span>Enviando respuesta...</span>
                                    </>:
                                    <>Responder Encuesta</>
                                }
                            </Button>

                            {
                                errors.allQuestionsAnswered && <Alert className='mt-4' variant='danger'>{errors.allQuestionsAnswered}</Alert>
                            }
                        </>
                    }
                </Col>
            </Row>
        </Container>
  )
}

export default Poll