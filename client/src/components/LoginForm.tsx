import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/userApi';

const LoginForm: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = async(values: any) => {
    const {email,password} = values
    try {
      await login({ email, password }).unwrap();
      message.success('Login successful');
      navigate('/');
    } catch (err:any) {
        const errorMessage = err?.data?.message 
        if(errorMessage){
          message.error(errorMessage)
        }else{
          message.error('Login failed. Please try again.');
        }
    }
  };


  return (

      <Form name="login" onFinish={onFinish} layout="vertical">

        <Form.Item label="Email" name="email"  rules={[{ required: true, message: 'Please enter your email number' }]}>
          <Input className="rounded-md" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password className="rounded-md" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" block className="bg-red-300 text-white hover:bg-green-700" loading={isLoading}  disabled={isLoading}  >
            {isLoading ? 'Logging in...' : 'Login'} 
          </Button>
        </Form.Item>

        <Form.Item className="m-0 text-center">
          <p className="text-sm">  Don't have an account?{' '}
            <Link  to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </Form.Item>

      </Form>

  );
};

export default LoginForm;
