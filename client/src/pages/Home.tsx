import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Main from '../components/Main';
const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen ">
         <Header />
          <div className="flex mt-16">
           <Sidebar />
            <main className="w-3/4 p-8 overflow-y-auto">
             <Main /> 
            </main>
          </div>
         </div>
    );
};

export default HomePage;
