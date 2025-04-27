import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserDashboard from './pages/User/UserDashboard';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<UserDashboard />} />
          </Routes>
        </BrowserRouter>
      </div >
      <Toaster toastOptions={{
        className: "",
        style: { fontSize: "13px", }
      }} />
    </>
  )
}

export default App