import React from 'react';
import { Form, Input, Modal } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const Login = ({ visible, onLogin, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal visible={visible}
    title="Login as manager:"
    okText="Login"
    cancelText="Cancel"
    onCancel={onCancel}
    onOk={() => {
      form
        .validateFields()
        .then((values) => {          
          form.resetFields();
          onLogin(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    }}>
      <Form
      form={form}
      {...layout}
      name="basic">
        
        <Form.Item
        label="Email"
        name='email'
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
        ><Input type='email'/>
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        ><Input.Password />
        </Form.Item>

      </Form>
    </Modal>
  );
};

