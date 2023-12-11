import { useEffect, useState } from 'react'
import { deletePoll, getUserPolls, togglePollOpened } from '../services/PollService'
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { List, Share, Trash } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip';
import ReactPaginate from 'react-paginate';
import copy from 'copy-to-clipboard';
import { BASE_URL } from '../utils/constants';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

const User = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecors, setTotalRecords] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [polls, setPolls] = useState<any>([]);

  useEffect(() => {
    fetchPolls();
  }, [currentPage]);

  const fetchPolls = async () => {
    const res: any = await getUserPolls(currentPage);
    setPolls(res.data.polls);
    setTotalPages(res.data.totalPages);
    setTotalRecords(res.data.totalRecords);
  }

  const handlePollToggle = async (id: number) => {
    const _polls = [...polls];
    const poll = _polls.find(pol => pol.id === id);
    poll.opened = !poll.opened;
    setPolls(_polls);
    await togglePollOpened(poll.pollId);
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  }

  const handleDeletePoll = (pollId: string) => {
    confirmAlert({
      customUI: ({onClose}) => {
        return (
          <div className='custom-ui'>
            <h2>Eliminar encuesta</h2>
            <p>¿Quieres eliminar esta encuesta?</p>
            <Button variant='outline-primary' size='sm' className='me-2'
              onClick={async () => {
                await deletePoll(pollId);
                currentPage === 0 ? fetchPolls() : setCurrentPage(0);
                onClose();
            }} 
            >
              Si!!, Eliminar
            </Button>
            <Button variant='outline-primary' size='sm' onClick={onClose}>No</Button>
          </div>
        );
      }
    })
    
  }

  const renderTable = () => {
    return (
      <Table className='mt-4 polls-table' striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Recibir más respuestas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            polls.map((poll: any) => {
              return(
                <tr key={poll.id}>
                  <td>{poll.content}</td>
                  <td>
                    <Form.Check type='switch' checked={!!poll.opened} onChange={() => {handlePollToggle(poll.id)}} label={!!poll.opened? 'Abierta' : 'Cerrada'}>
                    </Form.Check>
                  </td>
                  <td className='polls-table-controls'>
                    <span data-tooltip-id='tool-actions' data-tooltip-content='Compartir Encuesta' className='mr-3' onClick={() => {copy(`${BASE_URL}/replypoll/${poll.pollId}`); setShowToast(true);}}>
                      <Share></Share>
                    </span>
                    <span data-tooltip-id='tool-actions' data-tooltip-content='Ver Resultados' className='mr-3'>
                      <List></List>
                    </span>
                    <span data-tooltip-id='tool-actions' data-tooltip-content='Eliminar Encuesta' onClick={() => handleDeletePoll(poll.pollId)}>
                      <Trash></Trash>
                    </span>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    );
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col sm='10' md='10' lg='8' className='mx-auto'>
          <h4>Mis encuestas</h4>
          {
            totalRecors > 0 && polls ?
            <>
              {
                renderTable()
              }
              <ReactPaginate 
                  pageCount={totalPages} 
                  forcePage={currentPage}
                  marginPagesDisplayed={2} 
                  pageRangeDisplayed={2}
                  previousLabel={'Anterior'}
                  nextLabel={'Siguiente'}
                  containerClassName='pagination justify-content-end'
                  previousClassName='page-link'
                  previousLinkClassName='page-item'
                  nextClassName='page-link'
                  nextLinkClassName='page-item'
                  pageClassName='page-item'
                  pageLinkClassName='page-link'
                  activeClassName='active'
                  breakLabel='...'
                  onPageChange={handlePageChange}
              ></ReactPaginate>
              <Tooltip place='top' id='tool-actions' />
              <ToastContainer position='bottom-center' >
                <Toast show={showToast} delay={5000} autohide onClose={() => setShowToast(false)}>
                  <Toast.Header closeButton={false} >Compartido!</Toast.Header>
                  <Toast.Body>Enlace copeado al portapapeles</Toast.Body>
                </Toast>
              </ToastContainer>
            </>
            :
            <span className='d-block mt-5'>No tienes encuestas, <Link to='/createpoll'>comienza</Link> a crear</span>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default User