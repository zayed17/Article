import React from 'react';
// import LoginForm from '../components/LoginForm'; 
import UserProfileMain from '../components/UserProfileMain';
import Header from '../components/Header';

const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      {/* <Header />   */}
     <UserProfileMain />
    </div>
  );
};

export default UserProfile;
