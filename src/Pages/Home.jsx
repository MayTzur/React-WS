import React from 'react';
import { withRouter } from 'react-router-dom';
import { BackTop, Divider, Button, Row, Col, Space } from 'antd';
import Contact from '../Components/ContactForm';
import PropTypes  from 'prop-types';
import Slider from '../Components/Slider';
import {About} from '../Components/About';
import '../MyStyles/WebStyle.css';
import { ArrowUpOutlined } from '@ant-design/icons';
import { FaEllipsisH } from "react-icons/fa";


class HomePage extends React.Component{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);

        this.state = {
            status: 0,
            isReady: false,
            imgLeft: '',
            imgRight: ''
        }
    }

    move = () => {
        this.props.history.push({
            pathname: '/Manager/' + 2
        })
    }

    goGallery = () => {
        this.props.history.push({
            pathname: '/Gallery'
        })
    }

    render(){
        return(
            <>
                <Divider orientation="left">David's Works</Divider>
                <Row justify='center'>
                    <Col className='home'>
                        <Space direction="vertical" style={{ width: '100%'}}>
                            <Slider/>
                            <Button 
                                type='text' 
                                block 
                                className='gallery-btn' 
                                onClick={this.goGallery}>
                                    <Space align='center'>
                                        <FaEllipsisH/>Click here for watching Full Gallery<FaEllipsisH/>
                                    </Space>                                    
                                </Button>
                        </Space>
                    </Col>
                </Row>

                <Divider orientation="left">Biography and Experience</Divider>  
                <Row justify='center'>
                <Col className='home'>
                        <About/>
                    </Col>
                </Row>
                
                <Divider orientation="left">Contact Us</Divider>
                <Row justify='center'>
                    <Col className='home'>                       
                        <Contact/>
                    </Col>
                </Row>
                
                <BackTop>
                    <Button id='top-btn' type="primary" shape="circle" size='large' icon={<ArrowUpOutlined />} />                   
                </BackTop>
            </>
        )
    }
}
export default withRouter(HomePage);
