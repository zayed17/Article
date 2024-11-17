import { useState } from 'react';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

const UserProfileMain = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const profile = {
    firstName: "John",
    lastName: "Doe",
    headline: "Senior Software Engineer | Web3 Enthusiast | Tech Writer",
    location: "San Francisco, CA",
    bio: "Building the future of web technologies. Passionate about React, blockchain, and user experience. Writing about tech and sharing knowledge with the community.",
    email: "johndoe@example.com",
    phone: 90340349304,
    stats: {
      likes: 128,
      Unlikes: 892,
      Articles: 435,
    },
    highlights: [
      { label: 'Projects', value: '24' },
      { label: 'Articles', value: '86' },
      { label: 'Reviews', value: '142' },
    ],
  };

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="relative pt-12 pb-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Profile Image with Button */}
          <div className="relative">
            <img
              src="/article.jpg"
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* Name, Headline, and Contact Info */}
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-gray-600 mt-1">{profile.headline}</p>

            <div className="flex items-center justify-center mt-2 text-gray-600 text-sm">
              <MailOutlined className="mr-1" />
              <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                {profile.email}
              </a>
            </div>

            <div className="flex items-center justify-center mt-2 text-gray-600 text-sm">
              <PhoneOutlined className="mr-1" />
              <a href={`tel:${profile.phone}`} className="text-blue-600 hover:underline">
                {profile.phone}
              </a>
            </div>
          </div>

          {/* Follow Button */}
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-2 rounded-lg font-medium ${isFollowing
                ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-6 flex gap-12">
            <div className="flex items-center space-x-3">
              <div>
                <span className="block text-xl font-semibold text-gray-900">
                  {profile.stats.likes}
                </span>
                <p className="text-sm text-gray-600">Likes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <span className="block text-xl font-semibold text-gray-900">
                  {profile.stats.Unlikes}
                </span>
                <p className="text-sm text-gray-600">Unlikes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <span className="block text-xl font-semibold text-gray-900">
                  {profile.stats.Articles}
                </span>
                <p className="text-sm text-gray-600">Articles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileMain;
