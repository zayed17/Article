import { Modal, Input, Button, message, Form } from 'antd';
import { useChangePasswordMutation } from '../api/userApi';

interface ChangePasswordModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isModalOpen, onClose}) => {
  const [form] = Form.useForm();
  const [changePassword] = useChangePasswordMutation()


  const handlePasswordChange = () => {
    form.validateFields() .then(async (values) => {
        try {
          await changePassword(values).unwrap(); 
            message.success('Password changed successfully!');
            form.resetFields();
            onClose();
        } catch (error:any) {
            console.log(error)
          message.error(error.data.message);
        }
      }).catch(() => {
        message.error('Please fill in all fields correctly!');
      });
  };

  return (
    <Modal title="Change Password" visible={isModalOpen} onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handlePasswordChange}>
          Change Password
        </Button>,
      ]}>

      <Form form={form} layout="vertical" initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }} >
        <Form.Item label="Old Password" name="oldPassword"
          rules={[{ required: true, message: 'Please enter your old password!' }]}
        >
          <Input.Password placeholder="Enter Old Password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please enter your new password!' },
            { min: 8, message: 'Password must be at least 8 characters long!' },
          ]}
        >
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
