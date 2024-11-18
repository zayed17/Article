import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Login  from '../pages/Login';
import  SignUp  from '../pages/SignUp';
import HomePage from '../pages/Home';
import AddArticle from '../components/AddArticleForm';
import UserProfile from '../pages/UserProfile';
import ArticlePage from '../pages/Article';
import EditArticlePage from '../pages/EditArticlePage';
import ProtectedRoute from './Protected';
import PublicRoute from './Public';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
         <Route path="/login" element={<PublicRoute redirectTo='/' element={Login} />} />
         <Route path="/signup" element={<PublicRoute redirectTo='/' element={SignUp} />} />
         <Route path="/" element={<ProtectedRoute redirectTo='/login' element={HomePage} />} />
         <Route path="/profile" element={<ProtectedRoute redirectTo='/login' element={UserProfile} />} />
         <Route path="/add-article" element={<ProtectedRoute redirectTo='/login' element={AddArticle} />} />
         <Route path="/edit-article/:articleId" element={<ProtectedRoute redirectTo='/login' element={EditArticlePage} />} />
         <Route path="/article/:articleId" element={<ProtectedRoute redirectTo='/login' element={ArticlePage} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
