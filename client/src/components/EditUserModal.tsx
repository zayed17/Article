import React from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import { categories } from '../data/categories';
import { validatePreferences } from '../utils/validations';
import { useEditUserMutation,useGetUserQuery } from '../api/userApi';

interface EditUserModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    initialValues: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        preferences: string[];
    };
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isModalOpen, onClose, initialValues }) => {
    const [form] = Form.useForm();
    const [editUser] = useEditUserMutation()
    const { refetch } = useGetUserQuery({}); // Assuming you have this hook to fetch user data

    const handleFormSubmit = async (values: any) => {
        try {
          const response = await editUser(values).unwrap(); 
          message.success('User details updated successfully!',response);
          form.resetFields();
          onClose();
          refetch()
        } catch (error) {
          message.error('Failed to update user details');
        }
      };

    return (
        <Modal title="Edit User Details" open={isModalOpen} onCancel={onClose} onOk={() => form.submit()} okText="Save" cancelText="Cancel">
            <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleFormSubmit}>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Phone" name="phone"
                    rules={[
                        { required: true, message: 'Please enter your phone number!' },
                        {
                            pattern: /^\d{10}$/,
                            message: 'Phone number must be 10 digits!',
                        },
                    ]}
                >
                    <Input placeholder="Enter your phone number" maxLength={10} />
                </Form.Item>

                <Form.Item label="Preferences" name="preferences"
                    rules={[{ required: true, message: 'Please select your preferences!' },{validator: (_, value) => validatePreferences(value, 3)},]} >
                    <Select mode="multiple" placeholder="Select preferences">
                        {categories.map((category: string) => (
                            <Select.Option key={category} value={category}>
                                {category}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default EditUserModal;
