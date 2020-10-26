import React from 'react';
import {Box} from '@material-ui/core';
import '../MyStyles/WebStyle.css';
import { GiPaintBrush } from 'react-icons/gi';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

export const ContentHead = () => {
    return(
        <Box width="100%" maxHeight="25%">
            <Row justify='center'>
                <Col>
                    <Title id="title">DAVID MEY-TAL <GiPaintBrush/></Title>  
                </Col>
            </Row>
        </Box>
    )
}