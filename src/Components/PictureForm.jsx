import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Button,
    Upload,
    Checkbox,
    Modal,
    Image
  } from 'antd';
import 'antd/dist/antd.css';
import '../MyStyles/PictureFormStyle.css';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const normFile = (e) => {
    console.log('Upload event:', e.target);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
};

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const EditPicForm = ({ visible, onCreate, onCancel, data }) => {
    const [image, setImage] = useState('');
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);        
    };

    const handleChange = info => {
      console.log('handleChange info=', info);
      setImage(URL.createObjectURL(info.file.originFileObj));
    }

    return(
        <Modal visible={visible}
        title="Edit picture data"
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
            name="editPicture"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
                vailable: data.vailable,
                name: data.name,
                serial: data.serial_num,
                width: data.width,
                height: data.height,
                price: data.price,
            }}>

            <Form.Item 
                label="Picture name: "               
                name="name"
            ><Input/>
            </Form.Item>

            <Form.Item name="serial" label="Serial number:">
                <InputNumber min={1} max={5000}/>
            </Form.Item>

            <Form.Item name="width" label="Width:">
                <InputNumber min={1} max={1000000}/>
            </Form.Item>

            <Form.Item name="height" label="Height:">
                <InputNumber min={1} max={1000000}/>
            </Form.Item>

            <Form.Item name="price" label="Price:">
                <InputNumber 
                    min={1} 
                    max={1000000}
                    formatter={value => `${value}$`}
                    parser={value => value.replace('$', '')} 
                />
            </Form.Item>

            <Form.Item name="vailable" 
            valuePropName="checked" 
            wrapperCol={{
                span: 12,
                offset: 6,
            }}>
                <Checkbox>Is vailable?</Checkbox>
            </Form.Item>

            <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile} label="Picture:">
            <Upload name="files"
                    action='http://localhost:3000/Manager/2/May'
                    onChange={handleChange}
                    >
                  <Button icon={<UploadOutlined />}>Click to upload other image</Button>
                  {image != '' ? <Image src={image}/> : <Image src={data.file}/>}
                </Upload>
            </Form.Item>
        </Form>
        </Modal>
    );
}

export const PictureForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);       
    };

    return(
        <Modal visible={visible}
        title="Save new picture data"
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
            name="newPicture"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
                vailable: true,
            }}
        >

            <Form.Item 
                label="Picture name: "               
                name="name"
                rules={[{required: true, message: 'Please input picture name!',},]}
            ><Input/>
            </Form.Item>

            <Form.Item name="serial" label="Serial number:" rules={[{required: true, message: 'Please input picture serial number!',},]}>
                <InputNumber min={1} max={5000} />
            </Form.Item>

            <Form.Item name="width" label="Width:" rules={[{required: true, message: 'Please input picture width!',},]}>
                <InputNumber min={1} max={1000000} />
            </Form.Item>

            <Form.Item name="height" label="Height:" rules={[{required: true, message: 'Please input picture height!',},]}>
                <InputNumber min={1} max={1000000} />
            </Form.Item>

            <Form.Item name="price" label="Price:" rules={[{required: true, message: 'Please input picture price!',},]}>
                <InputNumber 
                    min={1} 
                    max={1000000}
                    formatter={value => `${value}$`}
                    parser={value => value.replace('$', '')} 
                />
            </Form.Item>

            <Form.Item name="vailable" 
            valuePropName="checked" 
            wrapperCol={{
                span: 12,
                offset: 6,
            }}>
                <Checkbox>Is vailable?</Checkbox>
            </Form.Item>

            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} label="Dragger" rules={[{required: true, message: 'Please input picture file!',},]}>
                <Upload.Dragger name="files" action="/http://localhost:3000/Manager/2/May">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
            </Form.Item>

          </Form>
        </Modal>
    );
}