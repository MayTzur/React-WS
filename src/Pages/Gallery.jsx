import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, BackTop, Divider, Card, Image, Button, Typography } from 'antd';
import { getPaintingsList } from '../Actions/lists';
import { BlockLoading } from 'react-loadingg';
import '../MyStyles/GalleryStyle.css';
import 'antd/dist/antd.css';
import { HomeOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;
const { Grid } = Card;

class GalleryPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { dataSource: null };
    }

    componentDidMount = async () => {
        console.log("*** componentDidMount function! ***");
        const data = await getPaintingsList();
        if(data !== null){
            this.setState({ dataSource: data })
        }        
    }

    createCard = (obj) => {
        console.log("*** createCard function! ***");

        let txt;
        let colorTxt;
        if(obj.vailable){
            txt = 'Available for sale';
            colorTxt = '#1890ff';
        }else{
            txt = 'Sold!';
            colorTxt = '#cf1322';
        }
        return(
            <Grid className='responsive'>                    
                <Card
                    className='card'
                    cover={<Image src={obj.file}/>}>
                    <Text underline>{'"' + obj.name + '"'}</Text>
                    <Divider/>
                    <Paragraph>
                        <Text strong>Width:</Text> {obj.width}<br/>    
                        <Text strong>Height:</Text> {obj.height}<br/>  
                        <Text strong>Price:</Text> {obj.price}$<br/>
                    </Paragraph>
                    <Text style={{color: colorTxt}}>{txt}</Text>       
                </Card>                   
            </Grid>
        )
    }
  
    render(){
        const { dataSource } = this.state;

        if(dataSource === null){
            return (<div style={{ height: '300px'}}>
                        <BlockLoading/>
                </div>)
        }
        return(
            <>
            <Row justify='end'>
                <Col>
                    <Button
                    className='btn'
                    type="primary"
                    onClick={() => {
                        this.props.history.push({
                            pathname: '/'
                        })
                    }}>Back To {<HomeOutlined style={{ fontSize: '2.2vw' }}/>}page</Button>
                </Col>
            </Row>

                <Row>
                    <Col style={{ width: '100%'}}>
                        <Divider orientation="left">David's Gallery</Divider>                   
                    </Col>
                </Row>

                <Row>
                    <Col style={{ width: '100%'}}>
                    {dataSource.map(obj => {
                    return this.createCard(obj);
                    })}
                    </Col>
                </Row>

                <BackTop>
                    <Button id='top-btn' type="primary" shape="circle" size='large' icon={<ArrowUpOutlined />} /> 
                </BackTop>
            </>
        )
    }
}
export default withRouter(GalleryPage);