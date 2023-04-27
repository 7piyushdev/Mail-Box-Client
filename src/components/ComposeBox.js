import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { EditorState } from "draft-js";
import { BsX } from "react-icons/bs";
import "./ComposeBox.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { sendMailHandler } from "../store/mail-thunk";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ComposeBox = () => {
  const navigate = useNavigate();
  const { mailId } = useParams();
  const emailRef = useRef();
  const subjectRef = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const dispatch = useDispatch();

  const onEditorStateChange = (editState) => {
    setEditorState(editState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      editor: editorState.getCurrentContent().getPlainText(),
      read: false,
    };
    dispatch(sendMailHandler(formValues));
  };

  const handleClick = () => {
    navigate("/home/inbox");
  };

  useEffect(() => {
    if (mailId) {
      emailRef.current.value = JSON.stringify(mailId);
    } else return;
  }, []);

  return (
    <>
      <div>
        <Container className='m-3 bg-default'>
          <Row className='d-flex'>
            <Col className='compose-header'>
              <h5>New Message</h5>
            </Col>
            <Col className='compose-header justify-content-end'>
              <Button variant='default' onClick={handleClick}>
                <BsX size={30} />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    ref={emailRef}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter subject'
                    ref={subjectRef}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicEditor'>
                  <Form.Label>Message</Form.Label>
                  <Editor
                    editorState={editorState}
                    toolbarClassName='toolbarClassName'
                    wrapperClassName='wrapperClassName'
                    editorClassName='editorClassName'
                    editorStyle={{ border: "1px solid", height: "10rem" }}
                    onEditorStateChange={onEditorStateChange}
                  />
                </Form.Group>
                <Col className='compose-footer'>
                  <Button variant='primary' type='submit'>
                    Send
                  </Button>
                </Col>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ComposeBox;
