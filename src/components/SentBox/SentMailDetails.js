import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/api";

const SentMailDetails = () => {
  const { id } = useParams();
  const [mail, setMail] = useState({});
  const { sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    let emailId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );
    const transformTasks = (mailsObj) => {
      setMail(mailsObj);
    };

    fetchTasks(
      {
        url: `https://mail-client-react-49408-default-rtdb.firebaseio.com/sentMails/${emailId}/${id}.json`,
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
      </Card>
    </>
  );
};

export default SentMailDetails;
