import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'

const App = () => {
  return (
    <div>
      {/* <h1>welcome to Swizzy</h1> */}

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>

   
    </div>
  )
}

export default App
