export const BASE_URL = "https://taskmanagerbackend-b2ik.onrender.com"

export const API_PATHS = {
    TASKS: {
        GET_ALL_TASKS: "/api/tasks/",
        CREATE_TASK: "/api/tasks/",
        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
    },
};