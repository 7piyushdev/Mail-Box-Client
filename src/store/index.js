import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import mailReducer from './mailSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailReducer
    }
});

export default store;