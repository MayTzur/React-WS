import React, { Component } from "react";
import { BlockLoading } from 'react-loadingg';
import { Image, Row, Col } from 'antd';
import { getImagesList } from '../Actions/lists';
import '../MyStyles/WebStyle.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export default class Slide extends Component {
    constructor(props){
        super(props);

        this.state = { dataSource: null, }
    }

    componentDidMount = async () => {
        console.log("*** componentDidMount function! ***");
        const data = await getImagesList();
        if(data !== null){
            this.setState({ dataSource: data })
        }
    }

    onChange = (a, b, c) => {
        console.log(a, b, c);
    }

    render(){
        const {dataSource} = this.state;

        const settings = {
            dots: false,
            infinite: true,
            centerMode: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 6000,
            cssEase: "linear"
        };

        if(dataSource === null){
            return (<div style={{ height: '300px'}}>
                <BlockLoading/>
            </div>)
        }
        return(
            <>
                <Row justify='center'>
                    <Col>
                        <Slider {...settings}>
                            {dataSource.map(i => {
                                return (<Image className='imgSlide' src={i}/>)
                                })}
                        </Slider>
                    </Col>
                </Row>
            </>
        )
    }
}