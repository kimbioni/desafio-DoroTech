import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Content from './pages/Content';
import React from 'react'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
          <Route index element={<Home />}></Route>
          <Route path='content' element={<Content />}></Route>
      </Routes>
    </Router>
  )
}

export default App
