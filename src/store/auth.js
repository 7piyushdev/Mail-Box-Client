import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = { isAuthenticated: false}

const authSlice = createSlice({
    name: 'authorise',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer;
