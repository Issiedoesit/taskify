import { useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Overview from './pages/Overview/Overview'
import Register from './pages/Auth/Register/Register'
import Login from './pages/Auth/Login/Login'
import DashboardPrivateRoute from './privateRoutes/DashboardPrivateRoute'
import Task from './pages/Task/Task'
import Projects from './pages/Projects/Projects'
import ProjectDynamic from './pages/Projects/ProjectDynamic'
import Messages from './pages/Messages/Messages'
import Deadline from './pages/Deadline/Deadline'
import Settings from './pages/Settings/Settings'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {

  const location = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[location])

  return (
    <MantineProvider>
    <div className={`font-avenirRegular bg-brandDashGray1x`}>
      <Routes>
        <Route element={<DashboardPrivateRoute />}>
          <Route path={``} element={<Overview />} />
          <Route path={`projects`} >
            <Route path='' element={<Projects />} />
            <Route path=':projectId' element={<ProjectDynamic />} />
          </Route>
          <Route path={`/task`} element={<Task />} />
          <Route path={`/message`} element={<Messages />} />
          <Route path={`/deadline`} element={<Deadline />} />
          <Route path={`/settings`} element={<Settings />} />
        </Route>
        <Route path='/auth'>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </div>
    </MantineProvider>
  )
}

export default App
