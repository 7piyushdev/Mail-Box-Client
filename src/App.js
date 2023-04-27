import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { authActions } from './store/auth'
import MailBoxNavBar from './components/MailBox/MailBoxNavBar';
import './App.css'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const count = useSelector(state => state.mail.count);

  const stayLogin = () => {
    const token = localStorage.getItem('token')
    if (!!token) {
      dispatch(authActions.login())
      return
    }
    if (!isAuthenticated) {
      navigate('/');
    }
  }

  const handleButtonClick = () => {
    navigate('/home/compose');
  }

  useEffect(() => {
    stayLogin();
  }, [])

  return (
    <>
      <MailBoxNavBar />
      <Container fluid={1}>
        <Row style={{ height: "93vh" }}>
          <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2 link" as="ul">
              <Button variant='success' onClick={handleButtonClick} className='mb-2'>Compose </Button>
              <NavLink to={'/home/inbox'} className={({ isActive }) => isActive ? 'active' : undefined} end>
                <ListGroup.Item className="m-1 bg- d-flex justify-content-between" action>
                  <span>Inbox</span> <span style={{ backgroundColor: 'grey', color: 'white', }}>{count} unread</span>
                </ListGroup.Item>
              </NavLink>
              <NavLink to={'/home/sent'} className={({ isActive }) => isActive ? 'active' : undefined} end>
                <ListGroup.Item className="m-1" action>
                  Sent
                </ListGroup.Item>
              </NavLink>
              <NavLink to={'/home/draft'} className={({ isActive }) => isActive ? 'active' : undefined} end>
                <ListGroup.Item className="m-1" action>
                  Draft
                </ListGroup.Item>
              </NavLink>
            </ListGroup>
          </Col>
          <Col xs={10} className="">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App