import React, { useEffect } from 'react'
import MailBoxList from '../../components/MailBox/MailBoxList';
import { useDispatch } from 'react-redux';
import { getMailHandler } from '../../store/mail-thunk';

const MailBox = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const refresh = setInterval(() => {
            console.log("setintervelid");
            dispatch(getMailHandler());
        }, 2000);
        return () => {
            console.log("clearintervelid");
            clearInterval(refresh);
        };
    }, []);



    return (
        <>
            <MailBoxList />
        </>
    )
}

export default MailBox