import React from 'react';
import UserProfileMain from '../components/UserProfileMain';
import ArticleTable from '../components/ArticleTable';
import Header from '../components/Header';

const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header />
      <div className="max-w-5xl mx-auto py-5 pt-20">
        <UserProfileMain />
        <div className="mt-8">
          <ArticleTable />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
