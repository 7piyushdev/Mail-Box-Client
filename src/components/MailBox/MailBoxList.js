import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete } from 'react-icons/md';
import { BsFillEyeFill } from 'react-icons/bs'
import { deleteItemById } from "../../store/mail-thunk";

const MailBoxList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mails = useSelector((state) => state.mail.mailList);

    const handleClick = (item) => {
        navigate(`/home/inbox/${item.id}`)
    }

    const handleDelete = (e, id) => {
        e.stopPropagation();
        dispatch(deleteItemById(id))
    }

    return (
        <>
            <ListGroup as="ul" variant="primary" className="m-3" >
                {mails.map((item) => {
                    return (
                        <ListGroup.Item key={item.id}
                            className="m-1 "
                            variant="primary"
                            action
                            onClick={() => handleClick(item)}>
                            <ul style={item.read === true ? { listStyleType: 'none', } : null}>
                                <li className="d-flex justify-content-between align-items-center"><span>{item.read === false ? <BsFillEyeFill /> : ''} {item.subject}</span> <span onClick={(e) => handleDelete(e, item.id)}><MdDelete /></span></li>
                            </ul>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </>
    );
};
export default MailBoxList;