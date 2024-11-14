import React from 'react';
import SignupForm from '../components/SignUpForm';

const SignupPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <div  className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/article.jpg)' }} >
          <div className="bg-black bg-opacity-40 p-8 text-white">
            <h3 className="text-xl font-bold">Welcome to Our Community</h3>
            <p className="mt-2">Join us and enjoy exclusive articles tailored just for you!</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create an Account</h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
