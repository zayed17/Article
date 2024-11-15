import React from 'react';
import AddArticleForm from '../components/AddArticleForm';
import Header from '../components/Header';

const AddArticle: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen ">
         <Header />
          <div className="flex mt-16">
           <AddArticleForm />
            
          </div>
         </div>
    );
};

export default AddArticle;
