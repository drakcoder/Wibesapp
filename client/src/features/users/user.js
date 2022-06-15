import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log("here in setToken");
            if (action.payload.success) {
                state.token = action.payload.token;
            }
        },
        removeToken: (state) => {
            state.token = "";
        }
    }
});

export const { setToken, removeToken } = userSlice.actions;

export default userSlice.reducer;