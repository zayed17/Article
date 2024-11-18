import React from "react";
import ArticleDetails from "../components/ArticlePage";
import Header from "../components/Header";

const ArticlePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container pt-20 mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ArticleDetails />
      </div>
    </div>
  );
};

export default ArticlePage;
