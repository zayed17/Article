import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 shadow-md text-gray-800 p-4 fixed w-full top-0 z-10">
    <div className="container mx-auto flex justify-center">
      <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200">
        ArticleHub
      </Link>
    </div>
  </header>
);

export default Header;
