import React from 'react';
import { Spin, Alert, Button, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'; 
import { Link } from 'react-router-dom';
import { useGetArticlesQuery, useLikeArticleMutation, useUnlikeArticleMutation } from '../api/articleApi';
import { formatDistanceToNow } from 'date-fns';
import { useGetUserQuery } from '../api/userApi';

const Main: React.FC = () => {
  const { data: articles, error, isLoading ,refetch} = useGetArticlesQuery({});
  const { data: user} = useGetUserQuery({});
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();

  

  const handleLike = async (articleId: string) => {
    try {
      await likeArticle(articleId);
      refetch();
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleDislike = async (articleId: string) => {
    try {
      await unlikeArticle(articleId);
      refetch(); 
    } catch (error) {
      console.error('Error disliking article:', error);
    }
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
      {articles && articles.length > 0 ? (
        articles.map((article: any) => {
          const truncateDescription = (text: string, length: number) => {
            return text.length > length ? text.substring(0, length) + '...' : text;
          };

          const formattedTime = formatDistanceToNow(new Date(article.createdAt), { addSuffix: true });
          const isLiked = article?.likedBy?.includes(user?._id);
          const isDisliked = article?.dislikedBy?.includes(user?._id);
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
                <Button type="text"
                  icon={isLiked ? <LikeFilled /> : <LikeOutlined />}
                  onClick={() => handleLike(article._id)}>
                  Like ({article.likedBy.length})
                </Button>

                <Button type="text"
                  icon={isDisliked ? <DislikeFilled /> : <DislikeOutlined />}
                  onClick={() => handleDislike(article._id)}>
                  Dislike ({article.dislikedBy.length})
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
