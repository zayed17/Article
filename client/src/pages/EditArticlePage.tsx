import React from 'react';
import Header from '../components/Header';
import EditArticle from '../components/EditArticle';

const EditArticlePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen ">
         <Header />
          <div className="flex mt-16">
           <EditArticle />
            
          </div>
         </div>
    );
};

export default EditArticlePage;
