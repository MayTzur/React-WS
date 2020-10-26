import React from 'react';
import { Button, Table, Space, Tag, notification, BackTop } from 'antd';
import 'antd/dist/antd.css';
import { firestore } from "../firebase";
import { BlockLoading } from 'react-loadingg';
import { getManagersList } from '../Actions/lists';
import { searchMember } from '../Actions/connect';
import { AddManager, EditManager } from '../Components/ManagerForm';
import { SmileOutlined, MehOutlined, FrownOutlined, DeleteOutlined, CheckCircleOutlined, ExclamationCircleOutlined, PlusOutlined, EditOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { DeleteConfirm } from '../Components/Dialog';
import '../MyStyles/ListStyle.css';

const managersRef = firestore.collection("/managers");
const { Column } = Table;

class ManagersList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataSource: null,
            visible: false,
            showEdit: false,
            record: {},
            showConfirm: false
        }
    }

    componentDidMount = async () => {
        console.log("*** componentDidMount function! ***");
        this.getData();      
    }

    getData = async () => {
        console.log("*** getData function! ***");
        const data = await getManagersList();
        if(data !== null){
            this.setState({ dataSource: data })
        } 
    }


    onEdit = (record) => {
        console.log("*** onEdit function! ***");
        this.setState({
            record: record,
            showEdit: true
        })
    }

    onSave = async (values) => {
        console.log("*** onSave function! ***");
        const { record } = this.state;
        this.changeShowEdit();
        let name, status, password, email;
        if(values.status !== undefined && values.status != record.status){
            status = values.status;
        } else {
            status = record.status;
        }

        if(values.name != record.name){
            name = values.name;
        } else {
            name = record.name;
        }

        if(values.password != record.password){
            password = values.password;
        } else {
            password = record.password;
        }

        if(values.email != record.email){
            email = values.email;
        } else {
            email = record.email;
        }

        managersRef.doc(record.id)
        .update({            
            password: password,
            email: email,
            name: name,
            status: status
        }).then(() => {
            this.getData();
            notification.open({
                message: 'Good news',
                description:
                  'The new data has been updated successfully!',
                icon: <SmileOutlined style={{ color: '#bae637' }} />,
            });
        })
        .catch((error) => {
            notification.open({
                message: 'Bad news...',
                description:
                  'Data update failed.',
                icon: <FrownOutlined style={{ color: '#d4380d' }} />,
            });
        })
    }

    changeVisible = () => this.setState({ visible: !this.state.visible });

    changeShowEdit = () => this.setState({ showEdit: !this.state.showEdit });

    onCreate = async (values) => {
        console.log("*** onCreate function! ***");
        this.changeVisible();
        const validate = await searchMember(values);

        if(validate.email && validate.password){
        let obj = {
            password: values.password,
            email: values.email,
            name: values.name,
            status: values.status
        }

        managersRef.add(obj)
        .then((doc) => {
            this.getData();
            notification.open({
                message: 'Hurray!',
                description:
                  'New manager was created.',
                icon: <SmileOutlined style={{ color: '#bae637' }} />,
            });
        })
        .catch((error) => {
            //console.error("Error adding document: ", error);
            notification.open({
                message: 'Oh no!',
                description:
                  'Failed to create manager. Error:' + error,
                icon: <FrownOutlined style={{ color: '#d4380d' }} />,
            });
        })
        }else{
            let msgEmail = '';
            let msgPassword = '';

            if(!validate.email){
                msgEmail = 'This email already exists.';
            }

            if(!validate.password){
                msgPassword = 'This password already exists.';
            }

            notification.open({
                message: 'Oops...',
                description:
                  msgEmail + ' ' + msgPassword,
                icon: <MehOutlined style={{ color: '#faad14' }} />,
            });
        }
    }

    onDelete = () => {
         console.log('onDelete=');
         const { record } = this.state;
         this.setState({ showConfirm: false });
         managersRef.doc(record.id)
            .delete().then(() => {
                this.getData();
                notification.open({
                    message: 'Success message!',
                    description:
                      'Deletion complete.',
                    icon: <CheckCircleOutlined style={{ color: '#bae637' }} />,
                });
            }).catch((error) => {
                //console.error("Error adding document: ", error);
                notification.open({
                    message: 'Error message!',
                    description:
                      'Deletion failed with error:' + error,
                    icon: <ExclamationCircleOutlined style={{ color: '#ad2102' }} />,
                });
            })
    }

    render(){
        const { dataSource, visible, showEdit, record, showConfirm } = this.state;
        if(dataSource === null){
            return (<div style={{ height: '300px'}}>
                        <BlockLoading/>
                </div>)
        }
        return(
            <>
                <DeleteConfirm
                visible={showConfirm}
                onClose={() => this.setState({ record: {}, showConfirm: false })}
                onClick={() => this.onDelete()}
                />

                <AddManager
                    visible={visible}
                    onCreate={this.onCreate}
                    onCancel={() => this.changeVisible()}
                />

                <EditManager
                    visible={showEdit}
                    onCreate={this.onSave}
                    onCancel={() => this.changeShowEdit()}
                    data={record}
                />
                <Button type="text" className='add-btn' shape="round" icon={<PlusOutlined />} block size='large' onClick={() => this.changeVisible()}>Add manager</Button>
                <Table dataSource={dataSource}>
                    <Column
                        title= 'Name'
                        dataIndex= 'name'
                        key= 'name'
                        onFilter= {(value, record) => record.name.indexOf(value) === 0}
                        sorter= {(a, b) => a.name.length - b.name.length}
                        sortDirections= {['descend', 'ascend']}
                    />

                    <Column
                        title= 'Email'
                        dataIndex= 'email'
                        key= 'email'/>
                    
                    <Column
                        title= 'Password'
                        dataIndex= 'password'
                        key= 'password'/>

                    <Column
                        title= 'Status'
                        dataIndex= 'status'
                        key= 'status'
                        render={status => {
                            if(status == 1){
                                return(<Tag color="green" key={status}>MANAGER</Tag>) 
                            }else{
                                return(<Tag color="purple" key={status}>MASTER</Tag>) 
                            }
                        }}
                    />

                    <Column title = 'Action'
                        dataIndex= 'action'
                        key= 'action'
                        render={(text, record) => (
                            <Space size="middle">
                                <Button shape="circle" className='edit-btn' icon={<EditOutlined />} onClick={() => this.onEdit(record)} />
                                <Button shape="circle" className='delete-btn' icon={<DeleteOutlined />} onClick={() => this.setState({ record: record, showConfirm: true})} />
                            </Space>
                    )}/>
                </Table>
                
                <BackTop>
                    <Button id='top-btn' type="primary" shape="circle" size='large' icon={<ArrowUpOutlined />} />                   
                </BackTop>
            </>
        )
    }
}
export default ManagersList;