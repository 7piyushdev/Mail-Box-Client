import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete } from 'react-icons/md'
import { deleteSentItemById } from "../../store/mail-thunk";

const SentMailList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sentMails = useSelector((state) => state.mail.mailsSent);
    const loading = useSelector(state => state.mail.loading)

    const handleClick = (item) => {
        navigate(`/home/sent/${item.id}`)
    }

    const handleDelete = (e, id) => {
        e.stopPropagation();
        dispatch(deleteSentItemById(id))
    }

    return (
        <>
            <ListGroup as="ul" variant="primary" className="m-3">
                {loading && <p className="text-center">Loading...</p>}
                {!loading && (sentMails.length === 0 ? <p className="text-center">Mail Box Empty</p> : sentMails.map((item) => {
                    return (
                        <ListGroup.Item key={item.id}
                            className="m-1 "
                            variant="primary"
                            action
                            onClick={() => handleClick(item)}>
                            <ul>
                                <li className="d-flex justify-content-between align-items-center"><span>{item.email}</span>
                                    <span onClick={(e) => handleDelete(e, item.id)}><MdDelete /></span>
                                </li>
                            </ul>
                        </ListGroup.Item>
                    )
                }))}
            </ListGroup>
        </>
    );
};
export default SentMailList;