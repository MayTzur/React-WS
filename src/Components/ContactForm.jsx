import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import '../MyStyles/ContactStyle.css';
import 'antd/dist/antd.css';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import emailjs from 'emailjs-com';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import metadata from 'libphonenumber-js/metadata.min.json'
const { Text } = Typography;

const serviceId = 'may6592';
const userId = 'user_quTkwwfbvxvXly7iUe65g';
const templateId = 'template_fwetmpf';

class Contact extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            message: '',
            phone: '',
            phoneValid: '',
            phoneErr: 'phone-good',
        }
    }

    // *** Message
    onMessageChange = e => {
        console.log('onMessageChange e=', e.target.value.length);
        this.setState({ message: e.target.value })    
    }

    // *** NAME
    onNameChange = e => {
        console.log('onNameChange e=', e.target.value.length);
        this.setState({ name: e.target.value })      
    }

    // *** Email
    onEmailChange = e => {
        console.log('onEmailChange e=', e);
        this.setState({email: e.target.value})       
    }

    // *** PHONE
    onPhoneChange = e => {
        console.log('onPhoneChange e=', e);
        if(e !== undefined){   
            this.setState({ phone: formatPhoneNumberIntl(JSON.stringify(e))})
        }
    }
    
    onPhoneBlur = () => {
        const { phone } = this.state;
        if(phone.length > 0){
            if(isValidPhoneNumber(phone)){
                this.setState({ 
                    phoneValid: '',
                    phoneErr: 'phone-good'
                });
            } else {
                this.setState({ 
                    phoneValid: 'Invalid phone number!',
                    phoneErr: 'phone-err'
                });
            }
        } else {
            this.setState({ 
                phoneValid: 'Please input your Phone number!',
                phoneErr: 'phone-err'
            });
        }
    }

    handleSubmit = e => { // ***
        console.log('handleSubmit e=', e);
        const { name, phone, email, message } = this.state;

        var templateParams = {
            'name': name,
            'email': email,
            'phone': phone,
            'message': message
        }

        emailjs.send(serviceId, templateId, templateParams, userId)
        .then(function(response) {
            //console.log('SUCCESS!', response.status, response.text);
            notification.open({
                message: 'YES!',
                description:
                  'Your request was sent successfully.',
                icon: <SmileOutlined style={{ color: '#bae637' }} />,
            });
         }, function(error) {
            //console.log('FAILED...', error);
            notification.open({
                message: 'Oh no!',
                description:
                  'Your request failed... Please try again later.',
                icon: <FrownOutlined style={{ color: '#d4380d' }} />,
            });
         });
    }

    render(){
        const { message, phoneErr, phoneValid, phone, email, name } = this.state;

        return(
            <>
            <div className='container'>
                <div className='contact-box'>
                    <div className='left'></div>
                    <div className='right'>
                        <h2>Contact Us</h2>

                        <Form name='contact-form' className="contact-form" onFinish={this.handleSubmit}>
                            <Form.Item 
                            name="name"
                            rules={[
                                {
                                  required: true,
                                  message: 'Please input your name',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {                                        
                                      if (value.length > 1) {
                                        return Promise.resolve();
                                      } 
                                      return Promise.reject('The input is not valid name!');
                                    },
                                  }),
                            ]}>
                                <Input 
                                type="text" 
                                className='field' 
                                required
                                placeholder='Your Name' 
                                onChange={this.onNameChange} 
                                onBlur={this.onNameBlur}
                                value={name}/>
                            </Form.Item>

                            <Form.Item 
                            rules={[
                                {
                                  type: 'email',
                                  message: 'The input is not valid E-mail!',
                                },
                                {
                                  required: true,
                                  message: 'Please input your E-mail!',
                                },
                            ]}
                            name='email'>
                                <Input 
                                className='field'
                                placeholder='Your Email'
                                onChange={this.onEmailChange} 
                                value={email}/>
                            </Form.Item>

                            <PhoneInput
                                placeholder="Enter phone number"
                                international
                                defaultCountry="IL"
                                metadata={metadata}
                                className='field'
                                value={phone}
                                onChange={this.onPhoneChange}
                                onBlur={() => this.onPhoneBlur()}/>
                           
                            <Text className={phoneErr} type="danger">{phoneValid}</Text>

                            <Form.Item name="message">
                                <Input.TextArea
                                className='field area' 
                                placeholder='Message' 
                                allowClear
                                onChange={this.onMessageChange} 
                                value={message}/>
                            </Form.Item>

                            <Button 
                            block
                            className='btn-con'
                            type='text'
                            htmlType='submit'
                            >SUBMIT</Button>
                            
                        </Form>                     
                    </div>
                </div>
            </div>
        </>
        )
    }
}
export default Contact;