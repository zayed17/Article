import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Login  from '../pages/Login';
import  SignUp  from '../pages/SignUp';
import HomePage from '../pages/Home';
import AddArticle from '../components/AddArticleForm';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
         <Route path='/' element={<HomePage/>} />
         <Route path="/login" element={<Login />} />
         <Route path='/signup' element={<SignUp/>} />
         <Route path='/add-article' element={<AddArticle/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
