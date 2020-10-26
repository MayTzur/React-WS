import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Button, Modal, Divider, Row, Col, Typography } from 'antd';
import 'antd/dist/antd.css';
import { ImFacebook2 } from 'react-icons/im';
import { HomeOutlined } from '@ant-design/icons';
import { checkMember } from '../Actions/connect';
import 'rodal/lib/rodal.css';
import moment from 'moment';
import '../MyStyles/WebStyle.css';

import HomePage from '../Pages/Home';
import GalleryPage from '../Pages/Gallery';
import ManagerPage from '../Pages/Manager';

import {Login} from './LoginForm';
import {ContentHead} from './Header';
import { ShowConfirm } from './Dialog';

const { Text } = Typography;

class WebLayout extends React.Component{

  constructor(props){
    super(props);
    //console.log('WebLayout component, props=', props);
    this.timerId = null;

    this.state = {
      disabled: JSON.parse(localStorage.getItem('isLocked') || false),
      values: null,
      counter: parseInt(localStorage.getItem('counter') || 0),
      txt: localStorage.getItem('txt') || 'Login',
      visible: false,
      showDialog: false,
      unlockLLL: localStorage.getItem('unlockLLL'),
      unlockx: parseInt(localStorage.getItem('counter') || 0),
      connected: false,
      class: 'hide',
      isLoad: false,
      class2: 'login-btn'
    }
  }

  onLogin = (values) => { 
    console.log('*** onLogin function - Received values of form: ', values);
    this.setState({ 
      values: values,
      txt: 'Loading...',
      loading: true,
      visible: false,
      counter: this.state.counter + 1,
      isLoad: true
    }, () => this.connecting())
  };

  closeDialog = () => {
    console.log('*** closeDialog function ***');
    this.setState({ 
      showDialog: false,
      txt: 'Login',
      isLoad: false
    })
  }

  tryAgain = () => {
    console.log('*** tryAgain function ***');
    this.setState({ 
      showDialog: false,
      counter: this.state.counter + 1
    }, () => this.connecting())
  }

  onLock = () => {
    console.log('*** onLock function ***');
    const { unlockx } = this.state;

    if(parseInt(unlockx) <= parseInt(moment().format('x'))){//unlock      
      clearInterval(this.timerId);
      this.setState({ 
        disabled: false,
        txt: 'Login',
        unlockx: 0,
        counter: 0,
        unlockLLL: null,
        isLoad: false
      },() => this.unlock())
    } else {
      console.log('still lock!!');
    }
  }

  unlock = () => {
    console.log('*** unlock function ***');
    const { txt, unlockx, isLocked, counter, unlockLLL } = this.state;

    localStorage.setItem('unlockx', JSON.stringify(unlockx));
    localStorage.setItem('isLocked', JSON.stringify(isLocked));
    localStorage.setItem('txt', txt);
    localStorage.setItem('unlockLLL', unlockLLL);
    localStorage.setItem('counter', JSON.stringify(counter));
  }

  storage = () => {
    console.log('*** storage function ***');
    const { txt, unlockx, unlockLLL } = this.state;

    localStorage.setItem('unlockx', JSON.stringify(unlockx));
    localStorage.setItem('unlockLLL', JSON.stringify(unlockLLL));
    localStorage.setItem('isLocked', JSON.stringify(true));
    localStorage.setItem('txt', txt);
    //Each minute will be checked according to the current time if 10 minutes have passed!
    this.timerId  = setInterval(() => this.onLock(), 10000);
  }

  connecting = async () => {
    console.log('*** connecting function ***');
    const { counter, values } = this.state;

    if(counter < 3){                
        let connected = await checkMember(values);
        if(connected.confirmed){ 
          this.setState({ 
            txt: 'Login',
            isLoad: false,
            disabled: false,
            unlockx: 0,
            counter: 0,
            unlockLLL: null,
            class: 'btn',
            class2: 'hide'
          },() => this.unlock())
          this.props.history.push({
            pathname: '/Manager/' + connected.status + '/' + connected.name
        })
        } else { 
            this.setState({ showDialog: true })
        }
      } else {
        this.setState({ 
          disabled: true,
          txt: 'Locked until ' + moment().add(10, 'minute').format('LLL'),
          isLoad: false,
          unlockx: moment().add(10, 'minute').format('x'),
          values: null
        },() => this.storage())
        Modal.error({
          title: 'Login error!',
          content: 'Login failed 3 times. You can try again at',
        });
      }
  }

    render(){
      const { disabled, txt, visible, showDialog, isLoad } = this.state;     
      const { onLogin, closeDialog, tryAgain } = this;

      return(
        <>    
          <Row className='head'>
            <Col flex='auto'>
            
                <Button
                className={this.state.class2}
                disabled={disabled}
                type="primary"
                loading={isLoad}
                onClick={() => this.setState({ visible: true })}
                >{txt}</Button>
      
                <Button
                className={this.state.class}
                type="primary"
                onClick={() => {
                  this.setState({ class: 'hide', class2: 'login-btn'})
                  this.props.history.push({
                    pathname: '/'
                  })
                }}>Back To {<HomeOutlined style={{ fontSize: '2.2vw' }}/>}page</Button>


                <Login visible={visible}
                onLogin={onLogin}
                onCancel={() => this.setState({ visible: false })}/>
             
            </Col>
            <Col flex='50px'>
              <a href='https://www.facebook.com/davidmeytal' className='facebook'><ImFacebook2/></a>  
            </Col>
          </Row>

          <Row align='middle' justify='center'>
            <Col style={{ padding: '3%'}}>         
                <ContentHead/>   
                <ShowConfirm 
                  visible={showDialog}
                  onClose={() => closeDialog()}
                  onClick={() => tryAgain()}/>
                <Switch>
                  <Route exact path='/'><HomePage/></Route>
                  <Route path='/Gallery'><GalleryPage/></Route>
                  <Route exact path='/Manager/:status/:name'><ManagerPage/></Route>
                </Switch>
            </Col>
          </Row>

          <Row justify='center' align="middle">
            <Col>
              <Divider/>
              <Text id='footer'>Davied Mey-Tal Web ©Created by May Tzur 2020</Text>             
            </Col>
          </Row>
       
      </>)
    }
  }
export default withRouter(WebLayout)


