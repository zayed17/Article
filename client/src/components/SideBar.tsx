import React from 'react';
import { UserOutlined, ReadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Avatar, Menu } from 'antd';
import { useGetUserQuery } from '../api/userApi';

const Sidebar: React.FC = () => {
  const { data, isLoading, isError } = useGetUserQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading user info</div>;

  return (
    <aside className="w-1/4 h-screen sticky top-16 p-4 bg-gray-100 shadow-lg">
      <div className="text-center mb-6">
        <Avatar size={64} icon={<UserOutlined />} />
        <h2 className="text-lg font-semibold mt-2">{data.name || 'User Name'}</h2>
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
    </aside>
  );
};

export default Sidebar;
