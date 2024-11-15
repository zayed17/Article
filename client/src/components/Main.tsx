import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
  const staticArticles = [
    {
      _id: '1',
      title: 'Mastering React in 2024',
      shortDescription: 'Learn the latest features and techniques to become a React pro this year.',
      imageUrl: 'https://source.unsplash.com/featured/?coding',
    },
    {
      _id: '2',
      title: 'The Future of Web Development',
      shortDescription: 'Explore the upcoming trends shaping the future of web development.',
      imageUrl: 'https://source.unsplash.com/featured/?technology',
    },
    {
      _id: '3',
      title: '10 Tips for Writing Clean Code',
      shortDescription: 'Practical advice to keep your codebase clean and maintainable.',
      imageUrl: 'https://source.unsplash.com/featured/?code',
    },
    {
      _id: '4',
      title: 'Understanding TypeScript',
      shortDescription: 'A comprehensive guide to mastering TypeScript for JavaScript developers.',
      imageUrl: 'https://source.unsplash.com/featured/?typescript',
    },
  ];

  return (
    <div className="main-feed-container mx-auto max-w-2xl mt-6 mb-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Latest Articles</h1>
      <div className="space-y-6">
        {staticArticles.map((article) => (
          <Card
            key={article._id}
            hoverable
            className="w-full shadow-lg rounded-lg overflow-hidden"
          >
            <div className="flex">
              <img
                alt={article.title}
                src={article.imageUrl}
                className="w-1/3 h-full object-cover"
              />
              <div className="p-4 w-2/3">
                <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
                <p className="text-gray-700 mt-2">{article.shortDescription}</p>
                <Link
                  to={`/article/${article._id}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold mt-4 block"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Main;
