# Task Management Dashboard

A responsive task management application built with React, Redux, and Tailwind CSS, designed to manage tasks in a Kanban board style. This project supports adding tasks, displaying tasks in three categories (To Do, In Progress, Done), and dragging and dropping tasks between columns. It integrates with a live REST API for task persistence, ensuring real-time data storage and retrieval.

## Features

• **Kanban-style Board:** Tasks are organized in three columns: To Do, In Progress, Done.

• **Task Management:**

• View tasks categorized by their status.

• Create new tasks via a modal.

• Edit task status by dragging and dropping between columns.

• **Persistent Data:** All tasks are persisted via a mock API.

• **Responsive Design:** The application is responsive and works on all screen sizes.

## Tech Stack

**Frontend Framework:** React

**State Management:** Redux

**Drag and Drop:** @dnd-kit library

**UI Design:** Tailwind CSS

**API Calls:** Axios

**Build Tool:** Vite

**Date Handling:** Moment.js

## Getting Started

### Prerequisites

Make sure you have the following installed:

• Node.js (>=16)

• npm or yarn (recommended)

### Clone the Repository

```bash
git clone https://github.com/AishwaryaS9/Digitalxc-TaskManagementDashboard.git

cd taskmanager
```

### Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### Run the Development Server

Start the Vite development server with the following command:

```bash
npm run dev
```

The application will be available at http://localhost:5173 by default.

## API Integration

This project integrates with a live backend API hosted at https://taskmanagerbackend-b2ik.onrender.com for task persistence.

### Endpoints

• **GET /api/tasks/:** Fetch all tasks.

• **POST /api/tasks/:** Create a new task.

• **PUT /api/tasks/:id/status:** Update task status.

• **GET /api/tasks/dashboard-data:** Fetch dashboard data.

### Note on Initial Launch

During the initial launch, there might be a slight delay as the backend server sets up configurations and caches. Subsequent startups will be faster.

## Core Features

**1. Display Tasks**

Tasks are fetched from the API and displayed in three categories: To Do, In Progress, and Done.

**2. Add New Task**

A modal allows users to add a new task, including:

Title: Required

Description: Optional

Status: Dropdown (To Do, In Progress, Done)

The task is saved to the API, and the UI updates to show the new task in the appropriate column.

**3. Drag & Drop Tasks**

Users can drag and drop tasks between the columns. The task's status is updated in the backend via an API call when dropped into a new column.

### Folder Structure

```bash
taskmanager/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│   ├── icon.ico
│   ├── vite.svg
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   ├── react.svg
│   ├── components/
│   │   ├── Card/
│   │   │   ├── InfoCard.jsx
│   │   │   ├── TaskCard.jsx
│   │   ├── Charts/
│   │   │   ├── CustomLegend.jsx
│   │   │   ├── CustomPieChart.jsx
│   │   │   ├── CustomTooltip.jsx
│   │   ├── CreateTask.jsx
│   │   ├── Inputs/
│   │   │   ├── SelectDropdown.jsx
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SideMenu.jsx
│   │   ├── Modal.jsx
│   │   ├── SortableItem.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── User/
│   │   │   ├── UserDashboard.jsx
│   ├── store/
│   │   ├── index.js
│   │   ├── slices/
│   │   │   ├── taskSlice.js
│   ├── utils/
│   │   ├── apiPaths.js
│   │   ├── axiosInstance.js
│   │   ├── data.js
│   │   ├── helper.js
├── vite.config.js
```

## Deployed Application

Check out the live version of the app here: [Task Management Dashboard]()
