import React from 'react';
import { Button, Table, Space, Image, Typography, notification, BackTop } from 'antd';
import { SmileOutlined, MehOutlined, FrownOutlined, DeleteOutlined, CheckCircleOutlined, ExclamationCircleOutlined, PlusOutlined, EditOutlined, ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { firestore } from "../firebase";
import { BlockLoading } from 'react-loadingg';
import { getPaintingsList, handleFireBaseUpload } from '../Actions/lists';
import { CheckOutlined, Close } from '@material-ui/icons';
import { PictureForm, EditPicForm } from '../Components/PictureForm';
import { DeleteConfirm } from '../Components/Dialog';
import '../MyStyles/ListStyle.css';

const { Column } = Table;
const { Text } = Typography;
const paintingsRef = firestore.collection("/paintings");

class PaintingsList extends React.Component{
    constructor(props){
        super(props);
        console.log('PaintingsList component, props=', props);

        this.state = {
            dataSource: null,
            visible: false,
            imgUrl: '',
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
        const data = await getPaintingsList();
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
        let name, file, serial, width, height, price, vailable;
        if(values.image !== undefined && values.image != record.file){
            const image = await values.image[0].originFileObj;
            const url = await handleFireBaseUpload(image);
            file = url.fireBaseUrl;
        }else {
            file = record.file;
        }

        if(values.name != record.name){
            name = values.name;
        }else {
            name = record.name;
        }

        if(values.serial != record.serial_num){
            serial = values.serial;
        }else {
            serial = record.serial_num;
        }

        if(values.width != record.width){
            width = values.width;
        }else {
            width = record.width;
        }

        if(values.height != record.height){
            height = values.height;
        }else {
            height = record.height;
        }

        if(values.price != record.price){
            price = values.price;
        }else {
            price = record.price;
        }

        if(values.vailable != record.vailable){
            vailable = values.vailable;
        }else {
            vailable = record.vailable;
        }

        paintingsRef.doc(record.id)
            .update({
                file: file,
                height: height,
                width: width,
                name: name,
                price: price,
                serial_num: serial,
                vailable: vailable
            }).then(() => {
                console.log("Document successfully updated!");
                this.getData();
                notification.open({
                    message: 'Good news',
                    description:
                      'The new data has been updated successfully!',
                    icon: <SmileOutlined style={{ color: '#bae637' }} />,
                });
            })
            .catch((error) => {
                console.error("Error update document: ", error);
                notification.open({
                    message: 'Bad news...',
                    description:
                      'Data update failed.',
                    icon: <FrownOutlined style={{ color: '#d4380d' }} />,
                });
            })
    }

    onCreate = async (values) => {
        console.log("*** onCreate function! ***");
        this.changeVisible();

        const image = await values.dragger[0].originFileObj;
        const url = await handleFireBaseUpload(image);
        
        if(url.exist){ 
            notification.open({
                message: 'Oops...',
                description:
                  'This painting already exists in the system.',
                icon: <MehOutlined style={{ color: '#faad14' }} />,
            });
        } else{       
        let obj = {
            file: url.fireBaseUrl,
            height: values.height,
            width: values.width,
            name: values.name,
            price: values.price,
            serial_num: values.serial,
            vailable: values.vailable
        }
        paintingsRef.add(obj)
            .then((doc) => {
                this.getData();
                notification.open({
                    message: 'YES!',
                    description:
                      'Adding a painting was successful.',
                    icon: <SmileOutlined style={{ color: '#bae637' }} />,
                });
            })
            .catch((error) => {
                //console.error("Error adding document: ", error);
                notification.open({
                    message: 'Oh no!',
                    description:
                      'Adding a painting was failed.',
                    icon: <FrownOutlined style={{ color: '#d4380d' }} />,
                });
            })
        }
    }

    changeVisible = () => this.setState({ visible: !this.state.visible });

    changeShowEdit = () => this.setState({ showEdit: !this.state.showEdit });
    
    onDelete = () => {
        console.log('onDelete=');
        const { record} = this.state;
        this.setState({ showConfirm: false });
        paintingsRef.doc(record.id)
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

            <PictureForm
            visible={visible}
            onCreate={this.onCreate}
            onCancel={() => this.changeVisible()}
            />

            <EditPicForm
            visible={showEdit}
            onCreate={this.onSave}
            onCancel={() => this.changeShowEdit()}
            data={record}
            />

            <Button type="text" className='add-btn' shape="round" icon={<PlusOutlined />} block size='large' onClick={() => this.changeVisible()}>Add painting</Button>
        
            <Table dataSource={dataSource}>
                <Column
                title= 'Serial Number'
                dataIndex= 'serial_num'
                key= 'serial_num'
                defaultSortOrder= 'descend'
                sorter= {(a, b) => a.serial_num - b.serial_num}
                />

                <Column title = 'Name'
                dataIndex= 'name'
                key= 'name'
                onFilter= {(value, record) => record.name.indexOf(value) === 0}
                sorter= {(a, b) => a.name.length - b.name.length}
                sortDirections= {['descend', 'ascend']}
                render={(text, record) => (
                    <Space size="middle">
                        <Image width={150} src={record.file}/>
                        <Text>{text}</Text>
                    </Space>
                )}/>

                <Column
                title= 'Price'
                dataIndex= 'price'
                key= 'price'/>

                <Column
                title= 'Width'
                dataIndex= 'width'
                key= 'width'/>

                <Column
                title= 'Height'
                dataIndex= 'height'
                key= 'height'/>

                <Column
                title= 'Vailable'
                dataIndex= 'vailable'
                key= 'vailable'
                render={vailable => {
                    if(vailable){
                        return(<Space><CheckOutlined/></Space>) 
                    }else{
                        return(<Space><Close/></Space>) 
                    }
                }}/>

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
export default PaintingsList;