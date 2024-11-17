import { useState } from 'react';
import { PhoneOutlined, MailOutlined, SettingOutlined, CameraOutlined } from '@ant-design/icons';
import { useGetUserQuery } from '../api/userApi';
import { useGetUserStatsQuery } from '../api/articleApi';
import EditUserModal from './EditUserModal';
import { Menu, Dropdown } from 'antd';
import ChangePasswordModal from './ChangePasswordModal';

const UserProfileMain = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { data: user } = useGetUserQuery({});
  const { data: userStat } = useGetUserStatsQuery({});

  
  const handleMenuClick = (e: any) => {
    if (e.key === 'edit') {
      setIsModalOpen(true);
    } else if (e.key === 'changePassword') {
      setIsPasswordModalOpen(true);
    }
  };


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit User</Menu.Item>
      <Menu.Item key="changePassword">Change Password</Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="relative pt-12 pb-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="relative">
            <img src="/article.jpg" alt="Profile"className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"/>
            <button className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-gray-700">
              <CameraOutlined className="text-lg" />
            </button>
          </div>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h1>
              <Dropdown overlay={menu} trigger={['click']}>
                <SettingOutlined className="text-gray-600 cursor-pointer hover:text-gray-900" />
              </Dropdown>
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

      <ChangePasswordModal isModalOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}/>
    </div>
  );
};

export default UserProfileMain;
