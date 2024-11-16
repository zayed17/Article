import React, { useState } from 'react';
import {  Spin, Alert, Button, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetArticlesQuery } from '../api/articleApi';
import { formatDistanceToNow } from 'date-fns';

const Main: React.FC = () => {
  const { data: articles, error, isLoading } = useGetArticlesQuery({});
  console.log(articles);

  const [likedArticles, setLikedArticles] = useState<{ [key: string]: boolean }>({});
  const handleDislikeToggle = (articleId: string) => {
    // Add the logic for handling dislikes, like updating the backend or state
  };
  
  const handleBlockToggle = (articleId: string) => {
  };
  
  const handleLikeToggle = (articleId: string) => {
    setLikedArticles((prevState) => ({
      ...prevState,
      [articleId]: !prevState[articleId],
    }));
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spin size="large" />
        <h3>Loading Articles...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <Alert message="Error" description="Failed to load articles" type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="main-feed-container mx-auto max-w-4xl mt-6 mb-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Latest Articles</h1>
  
      {articles && articles.length > 0 ? (
        articles.map((article: any) => {
  
          const truncateDescription = (text: string, length: number) => {
            return text.length > length ? text.substring(0, length) + '...' : text;
          };

          const formattedTime = formatDistanceToNow(new Date(article.createdAt), { addSuffix: true });

  
          return (
            <div key={article._id} className="w-full border shadow-lg rounded-lg overflow-hidden mb-6">
              <div className="flex items-center p-3">
                <Avatar src={'/article.jpg'} size={50} />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{article?.userId?.firstName + " " + article?.userId?.lastName}</p>
                  <p className="text-sm text-gray-500">Posted {formattedTime}</p>
                </div>
              </div>
  
              <div className="px-4">
                <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
                <p className="text-gray-700 mt-2">
                  {truncateDescription(article.shortDescription, 100)}
                  {article.shortDescription.length > 100 && (
                    <Link to={`/article/${article._id}`} className="text-blue-600 hover:text-blue-800 font-semibold ml-2">
                      Read More
                    </Link>
                  )}
                </p>
              </div>
  
              <Link to={`/article/${article._id}`}>
                <div className="w-full">
                  <img alt={article.title} src={article.imageUrl} className="mt-4 w-full h-auto object-cover cursor-pointer"/>
                </div>
              </Link>
  
              <div className="flex items-center gap-4 p-4">
                <Button type="text" icon={<LikeOutlined />} onClick={() => handleLikeToggle(article._id)}>
                    Like
                </Button>

                <Button type="text" icon={<DislikeOutlined />} onClick={() => handleDislikeToggle(article._id)} >
                    Dislike
                </Button>

                <Button type="text" onClick={() => handleBlockToggle(article._id)}  className="text-red-600 hover:text-red-800" >
                    Block
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No articles found.</p>
      )}
    </div>
  );
  
  
};

export default Main;
