import React from 'react';
import { Form, Input, Button, DatePicker, Select ,message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../api/userApi';

const { Option } = Select;

const SignupForm: React.FC = () => {
  const [signup, { isLoading }] = useSignupMutation(); 
  const navigate = useNavigate();

  const onFinish = async(values: any) => {
    const { firstName, lastName, email, phone, dob, password, preferences } = values;
    try {
      const response = await signup({
        firstName,
        lastName,
        email,
        phone,
        dob: dob.format('YYYY-MM-DD'),
        password,
        preferences,
      }).unwrap();

      console.log('Signup successful:', response);
      message.success('Signup successful');
      navigate('/login');
    } catch (err:any) {
      const errorMessage = err?.data?.message 
      if(errorMessage){
        message.error(errorMessage)
      }else{
      message.error('Signup failed. Please try again.');
      }
    }  
  };

  return (
    <Form name="signup" onFinish={onFinish} layout="vertical" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="First Name" name="firstName" className="m-0" rules={[{ required: true, message: 'Please enter your first name' }]} >
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" className="m-0" rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="Email" name="email" className="m-0" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]} >
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" className="m-0" rules={[{ required: true, message: 'Please enter your phone number' }]}>
          <Input />
        </Form.Item>
      </div>

      <Form.Item label="Date of Birth" name="dob" className="m-0" rules={[{ required: true, message: 'Please select your date of birth' }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="Password" name="password" className="m-0" rules={[{ required: true, message: 'Please enter a password' }]} >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirmPassword" className="m-0" dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </div>

      <Form.Item label="Article Preferences" name="preferences" className="m-0" rules={[{ required: true, message: 'Please select at least one preference' }]}>
        <Select mode="multiple" placeholder="Select article categories">
          <Option value="sports">Sports</Option>
          <Option value="politics">Politics</Option>
          <Option value="technology">Technology</Option>
          <Option value="space">Space</Option>
        </Select>
      </Form.Item>

      <Form.Item className="m-0">
        <Button htmlType="submit" block  loading={isLoading} disabled={isLoading} className="bg-red-300 text-white  hover:bg-green-700" >
          Sign Up
        </Button>
      </Form.Item>

      <Form.Item className="m-0 text-center">
        <p className="text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </Form.Item>


    </Form>
  );
};

export default SignupForm;
