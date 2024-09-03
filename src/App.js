import React, { useRef, useState, useEffect } from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Login from './components/Login'
import Camerapage from './components/Camerapage';
import C from './components/C';
import LogPage from './components/LogPage';

const App = () => {

    let serviceId = ""
    const location = useLocation()

    if (location.pathname === "/C") {
      serviceId = localStorage.getItem("serviceId")
    }

  return (
    <div>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/cpage' element={<Camerapage />} /> 
        <Route path='/cpage' element={<Camerapage />} />
        {
          serviceId ?  (<Route path='/C' element={<C/>} /> ) :( <Route path='/C' element={<Navigate to='/' replace />} />)
        } 
        <Route path='/logpage' element={<LogPage />} />
      </Routes>
    </div>
  );
};

export default App;
