import React from 'react';
import { UserOutlined, ReadOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Button } from 'antd';
import { useGetUserQuery, useLogoutMutation } from '../api/userApi';

const Sidebar: React.FC = () => {
  const { data, isLoading, isError } = useGetUserQuery({});
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate(); 

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading user info</div>;

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-1/4 h-screen sticky top-16 p-4 bg-gray-100 shadow-lg">
      <div className="text-center mb-6">
        <Avatar size={64} icon={<UserOutlined />} />
        <h2 className="text-lg font-semibold mt-2">{data.firstName} {data.lastName}</h2>
        <p className="text-sm text-gray-500">{data.email || 'user@example.com'}</p>
      </div>
      <Menu mode="vertical" className="bg-transparent border-0">
        <Menu.Item icon={<ReadOutlined />}>
          <Link to="/profile">My Articles</Link>
        </Menu.Item>
        <Menu.Item icon={<PlusCircleOutlined />}>
          <Link to="/add-article">Add Article</Link>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>

      <div className="mt-6 text-center">
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          loading={isLoggingOut}
          onClick={handleLogout}
          block
        >
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
