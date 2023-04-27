import React from "react";
// import "./InboxPage.css";
// import { Container, Form, Button, Navbar, Nav } from "react-bootstrap";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { mailSliceAction } from "../../store/mailSlice";

const MailBoxNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mailId");
    dispatch(authActions.logout());
    dispatch(mailSliceAction.onLogout());
    navigate("/");
  };

  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand> Home </MDBNavbarBrand>
          {/* <Form className='d-flex pl-5' style={{ width: "600px" }}>
              <Form.Control
                type='text'
                placeholder='Search'
                className='me-7'
                aria-label='Search'
              />
              <Button variant='primary'>Search</Button>
            </Form> */}
          <MDBInputGroup tag='form' className='d-flex w-auto mb-3'>
            <input
              className='form-control'
              placeholder='Type query'
              aria-label='Search'
              type='Search'
            />
            <MDBBtn variant='primary' outline>
              Search
            </MDBBtn>
          </MDBInputGroup>

          <MDBBtn variant='danger' onClick={handleLogout}>
            Logout
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};
export default MailBoxNavBar;
