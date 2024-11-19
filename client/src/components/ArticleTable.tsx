import { useGetUsersArticleQuery,useDeleteArticleMutation } from '../api/articleApi';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ArticleTable = () => {
  const { data: articles, error, isLoading,refetch } = useGetUsersArticleQuery({});
  const [deleteArticle] = useDeleteArticleMutation(); 
  const navigate = useNavigate()
  const handleDelete = async(id: string) => {
    await deleteArticle(id).unwrap(); 
    refetch()
    message.success('Article delete successful');
  };

  const handleEdit = (id:string)=>{
    navigate(`/edit-article/${id}`)
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => <span>{tags.join(', ')}</span>,
    },
    {
      title: 'Likes',
      dataIndex: 'likedBy',
      key: 'likes',
      render: (likedBy: any) => <span>{likedBy.length}</span>,
    },
    {
      title: 'Dislikes',
      dataIndex: 'dislikedBy',
      key: 'dislikes',
      render: (dislikedBy: any) => <span>{dislikedBy.length}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            // onClick={() => handleView(record)} 
          />
          <Button
            type="default"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)} 
          />
          <Popconfirm
            title="Are you sure you want to delete this article?"
            onConfirm={() => handleDelete(record._id)} 
            okText="Yes"
            cancelText="No"
          >
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8 text-center sm:text-left max-w-screen-lg mx-auto"> 
      <h2 className="text-2xl font-bold text-gray-900">Articles Posted</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-600">Error loading articles</p>
      ) : (
        <Table
          columns={columns}
          dataSource={articles}
          rowClassName="small-row"
          scroll={{ x: 'max-content' }}
          className="mt-4"  
        />
      )}
    </div>
  );
};

export default ArticleTable;
