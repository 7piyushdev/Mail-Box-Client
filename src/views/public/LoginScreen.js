import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Signup from './Signup'
import classes from './Login.module.css'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
    const [isLogging, setIsLogging] = useState(true);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const stayHome = () => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }

    useEffect(() => {
        stayHome();
    }, [])

    return (
        <>
            <div className={classes.loginWrapper}>
                {isLogging && <Login setIsLogging={setIsLogging} />}
                {!isLogging && <Signup setIsLogging={setIsLogging} />}
            </div>
        </>
    )
}

export default LoginScreen