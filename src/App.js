import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SimpleTodos from './components/SimpleTodos'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="card">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<SimpleTodos />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
