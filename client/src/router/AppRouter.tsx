import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Login  from '../pages/Login';
import  SignUp  from '../pages/SignUp';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
