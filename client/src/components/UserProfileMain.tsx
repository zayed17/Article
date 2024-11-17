import { useState } from 'react';
import { PhoneOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
import { useGetUserQuery } from '../api/userApi';
import { useGetUserStatsQuery } from '../api/articleApi';
import EditUserModal from './EditUserModal';



const UserProfileMain = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useGetUserQuery({});
  const { data: userStat } = useGetUserStatsQuery({});




  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="relative pt-12 pb-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
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

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h1>
              <EditOutlined
                className="text-gray-600 cursor-pointer hover:text-gray-900"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            {user?.preferences && (
          <p className="text-gray-600 mt-1">{user?.preferences.map((preference: string) => preference).join(', ')}</p>
            )}

            <div className="flex items-center justify-center mt-2 text-gray-600 text-sm">
              <MailOutlined className="mr-1" />
              <a href={`mailto:${user?.email}`} className="text-blue-600 hover:underline">
                {user?.email}
              </a>
            </div>

            <div className="flex items-center justify-center mt-2 text-gray-600 text-sm">
              <PhoneOutlined className="mr-1" />
              <a href={`tel:${user?.phone}`} className="text-blue-600 hover:underline">
                {user?.phone}
              </a>
            </div>
          </div>

          <div className="mt-4 flex gap-3 justify-center">
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

          <div className="mt-4 flex justify-between gap-12">
            <div className="flex flex-col items-center ">
              <span className="block text-xl font-semibold text-gray-900">
                {userStat?.likes}
              </span>
              <p className="text-sm text-gray-600">Likes</p>
            </div>

            <div className="flex flex-col items-center ">
              <span className="block text-xl font-semibold text-gray-900">
                {userStat?.dislikes}
              </span>
              <p className="text-sm text-gray-600">Unlikes</p>
            </div>

            <div className="flex flex-col items-center ">
              <span className="block text-xl font-semibold text-gray-900">
                {userStat?.articles}
              </span>
              <p className="text-sm text-gray-600">Articles</p>
            </div>
          </div>
        </div>
      </div>
      <EditUserModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        initialValues={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          phone: user?.phone || '',
          preferences: user?.preferences || [],
        }}
      />
    </div>
  );
};

export default UserProfileMain;
