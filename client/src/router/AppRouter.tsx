import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Login  from '../pages/Login';
import  SignUp  from '../pages/SignUp';
import HomePage from '../pages/Home';
import AddArticle from '../components/AddArticleForm';
import UserProfile from '../pages/UserProfile';
import ArticlePage from '../pages/Article';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
         <Route path='/' element={<HomePage/>} />
         <Route path="/login" element={<Login />} />
         <Route path='/signup' element={<SignUp/>} />
         <Route path='/add-article' element={<AddArticle/>} />
         <Route path='/profile' element={<UserProfile/>} />
         <Route path='/article/:articleId' element={<ArticlePage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
