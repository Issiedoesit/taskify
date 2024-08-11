import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Overview from './pages/Overview/Overview'
import Register from './pages/Auth/Register/Register'
import Login from './pages/Auth/Login/Login'
import DashboardPrivateRoute from './privateRoutes/DashboardPrivateRoute'

function App() {

  return (
    <div className={`font-avenirRegular`}>
      <Routes>
        <Route element={<DashboardPrivateRoute
         />}>
        <Route path={``} element={<Overview />}  />

        </Route>
        <Route path='/auth'>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
