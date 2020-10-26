import React from 'react';
import { Tabs, Divider } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'shards-react';
import PaintingsList from '../Components/PaintingsList';
import ManagersList from '../Components/ManagersList';

const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
      )}
    </Sticky>
);

class ManagerPage extends React.Component{
    constructor(props){       
        super(props);
        console.log('ManagerPage component, props=', props);
        this.status = props.match.params.status;
        this.name = props.match.params.name;
    }

    render(){
        const { name, status } = this;

        return(
            <>
                <Row>
                    <Col>
                        <Divider orientation="left">Hey {name}!</Divider>                       
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {status == 1? <PaintingsList/>:
                        <StickyContainer>
                            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                                <TabPane tab="Managers List" key="1"><ManagersList/></TabPane>
                                <TabPane tab="Paintings List" key="2"><PaintingsList/></TabPane>
                            </Tabs>
                        </StickyContainer>}
                    </Col>
                </Row>
            </>         
        )
    }
}
export default withRouter(ManagerPage);