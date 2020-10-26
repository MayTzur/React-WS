import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

const { Option } = Select;

export const EditManager = ({ visible, onCreate, onCancel, data }) => {
    const [form] = Form.useForm();
  
    return (
      <Modal
        visible={visible}
        title="Create a new manager"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}>
          <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
                email: data.email,
                name: data.name,
                password: data.password,
          }}>
  
              <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                      { required: true,
                          message: 'Please input the name of manager!',},
                  ]}><Input /></Form.Item>
  
              <Form.Item
                  label="Email"
                  name='email'
                  rules={[
                  {required: true,
                      message: 'Please input the email of manager!',},
                  ]}><Input type='email'/></Form.Item>
  
              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                  {required: true,
                  message: 'Please input the password of manager!',},
                  ]}><Input.Password /></Form.Item>
  
              <Form.Item name="status" label="Status">
                  <Select
                      placeholder="Select a option"
                      allowClear
                  >
                      <Option value={1}>MANAGER</Option>
                      <Option value={2}>MASTER</Option>
                  </Select>
              </Form.Item>
        
          </Form>
        </Modal>
    )
  }

export const AddManager = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new manager"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
        <Form
        form={form}
        layout="vertical"
        name="form_in_modal">

            <Form.Item
                name="name"
                label="Name"
                rules={[
                    { required: true,
                      message: 'Please input the name of manager!',},
                ]}
            ><Input /></Form.Item>

            <Form.Item
                label="Email"
                name='email'
                rules={[
                {required: true,
                    message: 'Please input the email of manager!',},
                ]}
            ><Input type='email'/></Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {required: true,
                message: 'Please input the password of manager!',},
                ]}
            ><Input.Password /></Form.Item>

            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option"
                    allowClear
                >
                    <Option value={1}>MANAGER</Option>
                    <Option value={2}>MASTER</Option>
                </Select>
            </Form.Item>
      
        </Form>
      </Modal>
  )
}