import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getMailByIdHandler } from "../../store/mail-thunk";
import useHttp from "../../hooks/api";

const MailDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mail, setMail] = useState({});
  const { sendRequest: fetchTasks } = useHttp();

  const handleClick = (mailId) => {
    navigate(`/home/compose/${mailId}`);
  };

  useEffect(() => {
    dispatch(getMailByIdHandler(id));
    let emailId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );
    const transformTasks = (mailsObj) => {
      setMail(mailsObj);
    };

    fetchTasks(
      {
        url: `https://mail-client-react-49408-default-rtdb.firebaseio.com/${emailId}/${id}.json`,
      },
      transformTasks
    );
  }, [fetchTasks]);

  return (
    <>
      <Card className='mt-3'>
        <Card.Header>
          <h3>{mail.subject}</h3>
        </Card.Header>
        <Card.Body>
          <p className='mb-5'>{mail.editor}</p>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => handleClick(mail.email)}>Reply</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default MailDetails;
