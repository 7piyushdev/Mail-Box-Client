import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMailHandler } from '../../store/mail-thunk';
import SentMailList from '../../components/SentBox/SentMailList';

const SentMail = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMailHandler());
    }, []);

    return (
        <>
            <SentMailList />
        </>
    )
}

export default SentMail