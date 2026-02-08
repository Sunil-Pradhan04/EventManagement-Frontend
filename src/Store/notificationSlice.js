import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        message: null,
        type: null, // 'success' | 'error' | 'info'
        isVisible: false,
    },
    reducers: {
        showToast: (state, action) => {
            // payload: { message: string, type: string }
            state.message = action.payload.message;
            state.type = action.payload.type || "info";
            state.isVisible = true;
        },
        hideToast: (state) => {
            state.isVisible = false;
        },
    },
});

export const { showToast, hideToast } = notificationSlice.actions;
export default notificationSlice.reducer;
