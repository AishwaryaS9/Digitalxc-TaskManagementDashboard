import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        data: null,
        dashboardData: null,
    },
    reducers: {
        allTask: (state, action) => {
            state.data = action.payload;
        },

        dashboardAllData: (state, action) => {
            state.dashboardData = action.payload;
        },

        clearAlltask(state) {
            state.data = null;
        },

        clearDashboardAllData(state) {
            state.dashboardData = null;
        }

    }
})

export const { allTask, dashboardAllData, clearAlltask, clearDashboardAllData } = taskSlice.actions;
export default taskSlice.reducer;